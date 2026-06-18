import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function adminApiMiddleware(env) {
  const backendUrl = env.BACKEND_API_URL || "http://127.0.0.1:5000";
  const adminToken = env.ADMIN_API_TOKEN || "";

  return {
    name: "projenius-admin-api-middleware",
    configureServer(server) {
      server.middlewares.use("/api/admin/blogs", async (req, res) => {
        if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed." }));
          return;
        }

        if (!adminToken) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "ADMIN_API_TOKEN is missing in admin-panel/.env." }));
          return;
        }

        const url = new URL(req.url || "", "http://localhost");
        const id = url.searchParams.get("id");
        const targetPath =
          req.method === "GET"
            ? "/api/blogs/admin/all"
            : req.method === "POST"
              ? "/api/blogs"
              : `/api/blogs/${id || ""}`;

        if ((req.method === "PUT" || req.method === "DELETE") && !id) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Blog id is required." }));
          return;
        }

        try {
          const rawBody = req.method === "GET" ? undefined : await readRequestBody(req);
          const response = await fetch(`${backendUrl.replace(/\/$/, "")}${targetPath}`, {
            method: req.method,
            headers: {
              Authorization: `Bearer ${adminToken}`,
              "Content-Type": "application/json",
            },
            body: rawBody,
          });

          const text = await response.text();
          res.statusCode = response.status;
          res.setHeader("Content-Type", response.headers.get("content-type") || "application/json");
          res.end(text);
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: error.message || "Unable to reach backend API." }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), adminApiMiddleware(env)],
  };
});
