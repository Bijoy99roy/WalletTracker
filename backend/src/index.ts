import express from "express";
import cors from "cors";
import { router } from "./routes/rootRouter";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// {*splat} needs to be added since it is a express v5 else it breaks
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

app.get("/healthcheck", (req, res) => {
  res.json({
    message: "Live",
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
