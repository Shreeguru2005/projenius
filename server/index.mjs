import "dotenv/config";
import { createApp } from "./app.mjs";
import { connectDatabase } from "./config/db.mjs";
import { startScheduledBlogPublisher } from "./jobs/newsletterQueue.mjs";

const PORT = Number(process.env.API_PORT || process.env.PORT || 5000);

connectDatabase()
  .then(() => {
    const app = createApp();

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
