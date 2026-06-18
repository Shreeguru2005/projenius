import { createConnectedApp } from "../server/app.mjs";

let appPromise;

export default async function handler(req, res) {
  try {
    appPromise ||= createConnectedApp();
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error("Failed to handle API request.");
    console.error(error);
    res.status(500).json({
      error: error.message || "API server failed to start.",
    });
  }
}
