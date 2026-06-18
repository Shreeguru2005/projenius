import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 360,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
      trim: true,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
        default: "ProJenius Team",
      },
      role: {
        type: String,
        trim: true,
        default: "Technology Insights",
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
      index: true,
    },
    scheduledAt: {
      type: Date,
      default: null,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
      index: true,
    },
    newsletterSentAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

blogSchema.index({ title: "text", description: "text", content: "text", tags: "text" });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
