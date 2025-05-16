// index.js
import express from "express";
import { doSomeHeavyTask } from "./util.js";
import { collectDefaultMetrics, register } from "prom-client"; // ESM imports

const app = express();
const PORT = process.env.PORT || 8000;

// Start collecting default Prometheus metrics
collectDefaultMetrics({ register });

app.get("/", (req, res) => {
   res.json({ message: "Hello from Express Server" });
});

app.get("/slow", async (req, res) => {
   try {
      const timeTaken = await doSomeHeavyTask();
      res.json({
         status: "Success",
         message: `Heavy Task completed in ${timeTaken}ms`,
      });
   } catch (error) {
      res.status(500).json({ status: "Error", message: "Internal Server Error" });
   }
});

app.get("/metrics", async (req, res) => {
   res.setHeader("Content-Type", register.contentType);
   res.end(await register.metrics());
});

app.listen(PORT, '0.0.0.0', () => {
   console.log(`✅ Express Server started at http://localhost:${PORT}`);
});
