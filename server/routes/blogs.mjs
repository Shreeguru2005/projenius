import { Router } from "express";
import { Blog } from "../models/Blog.mjs";
import { requireAdmin } from "../middleware/adminAuth.mjs";
import { queueBlogNewsletter } from "../jobs/newsletterQueue.mjs";
import { slugify } from "../utils/slugify.mjs";

export const blogRouter = Router();

function parseDataImage(imageValue) {
  const image = String(imageValue || "").trim();
  const match = image.match(/^data:(image\/(?:png|jpe?g|webp|gif));base64,([a-z0-9+/=\s]+)$/i);

  if (!match) {
    return null;
  }

  return {
    contentType: match[1].toLowerCase(),
    buffer: Buffer.from(match[2].replace(/\s/g, ""), "base64"),
  };
}

function normalizeImages({ thumbnailUrl, galleryImages }) {
  const images = Array.isArray(galleryImages)
    ? galleryImages
        .map((image) => String(image || "").trim())
        .filter(Boolean)
    : [];
  const thumbnail = String(thumbnailUrl || images[0] || "").trim();

  if (thumbnail && !images.includes(thumbnail)) {
    images.unshift(thumbnail);
  }

  return {
    thumbnailUrl: thumbnail,
    galleryImages: images,
  };
}

function normalizePublication({ status = "published", scheduledAt }) {
  const nextStatus = ["draft", "published", "scheduled"].includes(status)
    ? status
    : "published";

  if (nextStatus === "draft") {
    return {
      status: "draft",
      scheduledAt: null,
      publishedAt: null,
    };
  }

  if (nextStatus === "scheduled") {
    const publishDate = new Date(scheduledAt);

    if (!scheduledAt || Number.isNaN(publishDate.getTime())) {
      throw new Error("A valid schedule date and time is required.");
    }

    if (publishDate <= new Date()) {
      throw new Error("Schedule date and time must be in the future.");
    }

    return {
      status: "scheduled",
      scheduledAt: publishDate,
      publishedAt: publishDate,
    };
  }

  return {
    status: "published",
    scheduledAt: null,
    publishedAt: new Date(),
  };
}

async function sendBlogThumbnail(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id).select("thumbnailUrl").lean();

    if (!blog?.thumbnailUrl) {
      res.status(404).json({ error: "Blog image not found." });
      return;
    }

    if (/^https?:\/\//i.test(blog.thumbnailUrl)) {
      res.redirect(302, blog.thumbnailUrl);
      return;
    }

    const dataImage = parseDataImage(blog.thumbnailUrl);

    if (!dataImage) {
      res.status(404).json({ error: "Blog image is not available as a public image." });
      return;
    }

    res.setHeader("Content-Type", dataImage.contentType);
    res.setHeader("Content-Disposition", `inline; filename="blog-thumbnail.${dataImage.contentType.split("/")[1]}"`);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(dataImage.buffer);
  } catch (error) {
    next(error);
  }
}

blogRouter.get("/", async (req, res, next) => {
  try {
    const { tag, limit = 20, page = 1 } = req.query;
    const query = { status: "published" };

    if (tag && tag !== "Latest") {
      query.tags = String(tag);
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageLimit = Math.min(50, Math.max(1, Number(limit) || 20));

    const [items, total] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((pageNumber - 1) * pageLimit)
        .limit(pageLimit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    res.json({
      items,
      page: pageNumber,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageLimit)),
    });
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/admin/all", requireAdmin, async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    res.json({ items: blogs });
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id/thumbnail", sendBlogThumbnail);
blogRouter.get("/:id/thumbnail.jpg", sendBlogThumbnail);

blogRouter.get("/:slug", async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    }).lean();

    if (!blog) {
      res.status(404).json({ error: "Blog not found." });
      return;
    }

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const {
      title,
      description,
      content,
      thumbnailUrl,
      galleryImages,
      author = {},
      tags = [],
      status = "published",
      scheduledAt,
    } = req.body;

    const images = normalizeImages({ thumbnailUrl, galleryImages });

    if (!title || !description || !content || !images.thumbnailUrl) {
      res.status(400).json({
        error: "title, description, content, and at least one image are required.",
      });
      return;
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 1;

    while (await Blog.exists({ slug })) {
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
    }

    let publication;

    try {
      publication = normalizePublication({ status, scheduledAt });
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      thumbnailUrl: images.thumbnailUrl,
      galleryImages: images.galleryImages,
      author: {
        name: author.name || "ProJenius Team",
        role: author.role || "Technology Insights",
      },
      tags,
      status: publication.status,
      scheduledAt: publication.scheduledAt,
      publishedAt: publication.publishedAt,
      newsletterSentAt: publication.status === "published" ? new Date() : null,
    });

    if (blog.status === "published") {
      queueBlogNewsletter(blog.toObject());
    }

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const {
      title,
      description,
      content,
      thumbnailUrl,
      galleryImages,
      author = {},
      tags = [],
      status,
      scheduledAt,
    } = req.body;

    const images = normalizeImages({ thumbnailUrl, galleryImages });

    if (!title || !description || !content || !images.thumbnailUrl) {
      res.status(400).json({
        error: "title, description, content, and at least one image are required.",
      });
      return;
    }

    const existing = await Blog.findById(req.params.id);

    if (!existing) {
      res.status(404).json({ error: "Blog not found." });
      return;
    }

    const wasPublished = existing.status === "published";
    let publication;

    try {
      publication = normalizePublication({
        status: status || existing.status,
        scheduledAt,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    existing.title = title;
    existing.description = description;
    existing.content = content;
    existing.thumbnailUrl = images.thumbnailUrl;
    existing.galleryImages = images.galleryImages;
    existing.author = {
      name: author.name || "ProJenius Team",
      role: author.role || "Technology Insights",
    };
    existing.tags = tags;
    existing.status = publication.status;
    existing.scheduledAt = publication.scheduledAt;
    existing.publishedAt = publication.publishedAt;

    await existing.save();

    if (!wasPublished && existing.status === "published" && !existing.newsletterSentAt) {
      existing.newsletterSentAt = new Date();
      await existing.save();
      queueBlogNewsletter(existing.toObject());
    }

    res.json(existing);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: "Blog not found." });
      return;
    }

    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    next(error);
  }
});
