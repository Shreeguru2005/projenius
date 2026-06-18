import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDatabase } from "./config/db.mjs";
import { blogRouter } from "./routes/blogs.mjs";
import { newsletterRouter } from "./routes/newsletter.mjs";
import { startScheduledBlogPublisher } from "./jobs/newsletterQueue.mjs";

const app = express();
const PORT = Number(process.env.API_PORT || process.env.PORT || 5000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

app.use(
  cors({
    origin: CLIENT_ORIGIN === "*" ? true : CLIENT_ORIGIN.split(","),
  }),
);
app.use(express.json({ limit: process.env.API_JSON_LIMIT || "12mb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "projenius-api" });
});

app.use("/api/blogs", blogRouter);
app.use("/api/newsletter", newsletterRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.use((error, req, res, _next) => {
  console.error(error);
  res.status(500).json({
    error: "Something went wrong. Please try again later.",
  });
});

connectDatabase()
  .then(() => {
    startScheduledBlogPublisher();

    app.listen(PORT, () => {
      console.log(`ProJenius API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start ProJenius API.");
    console.error(error);
    process.exit(1);
  });
