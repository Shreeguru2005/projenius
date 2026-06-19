import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  content: "",
  thumbnailUrl: "",
  galleryImages: [],
  authorName: "ProJenius Team",
  authorRole: "Technology Insights",
  tags: "Company",
  status: "published",
  scheduledAt: "",
};

const MAX_BLOG_IMAGES = 8;
const MAX_IMAGE_SIZE_MB = 6;
const MAX_STORED_IMAGE_SIZE_MB = 1.2;
const MAX_IMAGE_DIMENSION = 1600;

function readImageFile(file, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(`Unable to read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to process selected image."));
    image.src = dataUrl;
  });
}

async function compressImageFile(file) {
  const originalDataUrl = await readImageFile(file);

  if (!file.type.startsWith("image/")) {
    return originalDataUrl;
  }

  const image = await loadImage(originalDataUrl);
  const scale = Math.min(
    1,
    MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height),
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
  canvas.height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  let quality = 0.86;
  let compressed = canvas.toDataURL("image/jpeg", quality);
  const maxLength = MAX_STORED_IMAGE_SIZE_MB * 1024 * 1024 * 1.37;

  while (compressed.length > maxLength && quality > 0.55) {
    quality -= 0.08;
    compressed = canvas.toDataURL("image/jpeg", quality);
  }

  return compressed;
}

function toDatetimeLocalValue(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

async function readApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  throw new Error(
    text.includes("export default")
      ? "Admin API is not connected. Restart the admin dev server after setting BACKEND_API_URL and ADMIN_API_TOKEN."
      : text || "Unexpected response from admin API.",
  );
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [message, setMessage] = useState("");

  const loadBlogs = async () => {
    setIsLoadingBlogs(true);

    try {
      const response = await fetch("/api/admin/blogs");
      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.error || "Unable to load blogs.");
      }

      setBlogs(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      setMessage(error.message || "Unable to load blogs.");
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setEditingId("");
    setForm(initialForm);
    setMessage("");
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      description: blog.description || "",
      content: blog.content || "",
      thumbnailUrl: blog.thumbnailUrl || "",
      galleryImages: Array.isArray(blog.galleryImages)
        ? blog.galleryImages
        : blog.thumbnailUrl
          ? [blog.thumbnailUrl]
          : [],
      authorName: blog.author?.name || "ProJenius Team",
      authorRole: blog.author?.role || "Technology Insights",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "Company",
      status: blog.status || "published",
      scheduledAt: toDatetimeLocalValue(blog.scheduledAt || blog.publishedAt),
    });
    setMessage("Editing selected blog.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}"? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setMessage("Deleting blog...");

    try {
      const response = await fetch(`/api/admin/blogs?id=${blog._id}`, {
        method: "DELETE",
      });
      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete blog.");
      }

      if (editingId === blog._id) {
        resetForm();
      }

      setMessage("Blog deleted successfully.");
      await loadBlogs();
    } catch (error) {
      setMessage(error.message || "Unable to delete blog.");
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    setMessage("Preparing images...");

    try {
      const availableSlots = MAX_BLOG_IMAGES - form.galleryImages.length;
      const selectedFiles = files.slice(0, Math.max(0, availableSlots));

      if (!selectedFiles.length) {
        setMessage(`You can upload up to ${MAX_BLOG_IMAGES} images per blog.`);
        event.target.value = "";
        return;
      }

      const validFiles = selectedFiles.filter((file) => {
        const isImage = file.type.startsWith("image/");
        const isAllowedSize = file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024;
        return isImage && isAllowedSize;
      });

      if (validFiles.length !== selectedFiles.length) {
        setMessage(`Only image files under ${MAX_IMAGE_SIZE_MB}MB each were added.`);
      }

      const uploadedImages = await Promise.all(validFiles.map(compressImageFile));

      setForm((current) => {
        const nextImages = [...current.galleryImages, ...uploadedImages];

        return {
          ...current,
          galleryImages: nextImages,
          thumbnailUrl: current.thumbnailUrl || nextImages[0] || "",
        };
      });

      if (validFiles.length === selectedFiles.length) {
        setMessage("Images added. The selected thumbnail is shown on the public blog card.");
      }
    } catch (error) {
      setMessage(error.message || "Unable to prepare images.");
    } finally {
      event.target.value = "";
    }
  };

  const removeImage = (imageToRemove) => {
    setForm((current) => {
      const nextImages = current.galleryImages.filter((image) => image !== imageToRemove);

      return {
        ...current,
        galleryImages: nextImages,
        thumbnailUrl:
          current.thumbnailUrl === imageToRemove ? nextImages[0] || "" : current.thumbnailUrl,
      };
    });
  };

  const setAsThumbnail = (image) => {
    setForm((current) => ({ ...current, thumbnailUrl: image }));
  };

  const getScheduledAtPayload = () =>
    form.status === "scheduled" ? new Date(form.scheduledAt).toISOString() : null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.thumbnailUrl || !form.galleryImages.length) {
      setMessage("Upload at least one blog image before publishing.");
      return;
    }

    if (form.status === "scheduled") {
      const scheduledDate = new Date(form.scheduledAt);

      if (!form.scheduledAt || Number.isNaN(scheduledDate.getTime())) {
        setMessage("Choose a valid schedule date and time.");
        return;
      }

      if (scheduledDate <= new Date()) {
        setMessage("Schedule date and time must be in the future.");
        return;
      }
    }

    setIsSubmitting(true);
    setMessage("Publishing blog...");

    try {
      const response = await fetch(
        editingId ? `/api/admin/blogs?id=${editingId}` : "/api/admin/blogs",
        {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          content: form.content,
          thumbnailUrl: form.thumbnailUrl,
          galleryImages: form.galleryImages,
          scheduledAt: getScheduledAtPayload(),
          author: {
            name: form.authorName,
            role: form.authorRole,
          },
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          status: form.status,
        }),
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.error || "Unable to publish blog.");
      }

      setMessage(
        data.status === "scheduled"
          ? "Blog scheduled. It will publish automatically at the selected time."
          : data.status === "published"
          ? "Blog published. It will now appear on the public website."
          : "Draft saved successfully.",
      );
      setForm(initialForm);
      setEditingId("");
      await loadBlogs();
    } catch (error) {
      setMessage(error.message || "Unable to publish blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <aside className="admin-sidebar">
          <span>ProJenius Admin</span>
          <h1>Blog Publisher</h1>
          <p>
            Create, update, and remove articles for the public ProJenius website.
            Published posts are stored in MongoDB and fetched by the main blog page.
          </p>
        </aside>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <div>
              <span>{editingId ? "Edit mode" : "Create mode"}</span>
              <h2>{editingId ? "Edit Blog" : "Create New Blog"}</h2>
            </div>
            {editingId && (
              <button className="ghost-btn" onClick={resetForm} type="button">
                Cancel Edit
              </button>
            )}
          </div>

          <div className="form-grid single-column">
            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="New blog title"
              />
            </label>
          </div>

          <section className="image-upload-panel">
            <div>
              <span>Blog Images</span>
              <h3>Upload multiple images</h3>
              <p>
                Add up to {MAX_BLOG_IMAGES} images. The selected thumbnail is shown on
                the public blog card.
              </p>
            </div>

            <label className="image-upload-control">
              <input
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                type="file"
              />
              <strong>Choose Images</strong>
              <small>
                PNG, JPG, WebP. Max {MAX_IMAGE_SIZE_MB}MB each. Large images are optimized automatically.
              </small>
            </label>

            {form.galleryImages.length > 0 && (
              <div className="image-preview-grid">
                {form.galleryImages.map((image) => (
                  <figure className="image-preview" key={image}>
                    <img src={image} alt="" />
                    <figcaption>
                      <button
                        className={form.thumbnailUrl === image ? "selected" : ""}
                        onClick={() => setAsThumbnail(image)}
                        type="button"
                      >
                        {form.thumbnailUrl === image ? "Thumbnail" : "Use as thumbnail"}
                      </button>
                      <button onClick={() => removeImage(image)} type="button">
                        Remove
                      </button>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>

          <label>
            Description
            <textarea
              required
              rows="3"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Short summary shown on the blog page"
            />
          </label>

          <label>
            Content
            <textarea
              required
              rows="10"
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              placeholder="Full blog content. HTML is supported."
            />
          </label>

          <div className="form-grid">
            <label>
              Author Name
              <input
                value={form.authorName}
                onChange={(event) => updateField("authorName", event.target.value)}
              />
            </label>

            <label>
              Author Role
              <input
                value={form.authorRole}
                onChange={(event) => updateField("authorRole", event.target.value)}
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Tags
              <input
                value={form.tags}
                onChange={(event) => updateField("tags", event.target.value)}
                placeholder="AI, Company, IoT"
              />
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
              >
                <option value="published">Publish now</option>
                <option value="scheduled">Schedule later</option>
                <option value="draft">Save draft</option>
              </select>
            </label>
          </div>

          {form.status === "scheduled" && (
            <label className="schedule-field">
              Schedule Date and Time
              <input
                required
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(event) => updateField("scheduledAt", event.target.value)}
              />
              <small>
                The blog stays hidden until this time, then publishes automatically.
              </small>
            </label>
          )}

          <div className="form-actions">
            <button disabled={isSubmitting} type="submit">
              {isSubmitting
                ? "Saving..."
                : editingId
                  ? "Update Blog"
                  : form.status === "scheduled"
                    ? "Schedule Blog"
                    : "Publish Blog"}
            </button>
            {message && <p>{message}</p>}
          </div>
        </form>

        <section className="blog-manager">
          <div className="manager-header">
            <div>
              <span>Published and Draft Blogs</span>
              <h2>Manage Blogs</h2>
            </div>
            <button onClick={loadBlogs} type="button">
              Refresh
            </button>
          </div>

          {isLoadingBlogs ? (
            <p className="manager-empty">Loading blogs...</p>
          ) : blogs.length ? (
            <div className="blog-list">
              {blogs.map((blog) => (
                <article className="manager-blog-card" key={blog._id}>
                  <img src={blog.thumbnailUrl} alt="" />
                  <div>
                    <span>{blog.status}</span>
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                    <small>
                      {Array.isArray(blog.galleryImages) && blog.galleryImages.length
                        ? `${blog.galleryImages.length} images`
                        : "1 image"}
                    </small>
                    {blog.status === "scheduled" && blog.publishedAt && (
                      <small>
                        Publishes {new Date(blog.publishedAt).toLocaleString()}
                      </small>
                    )}
                  </div>
                  <div className="manager-actions">
                    <button onClick={() => editBlog(blog)} type="button">
                      Edit
                    </button>
                    <button className="danger" onClick={() => deleteBlog(blog)} type="button">
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="manager-empty">No blogs found yet.</p>
          )}
        </section>
      </section>
    </main>
  );
}
