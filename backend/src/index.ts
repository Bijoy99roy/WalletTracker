import express from "express";
import cors from "cors";
import { router } from "./routes/rootRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.get("/healthcheck", (req, res) => {
  res.json({
    message: "Live",
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
