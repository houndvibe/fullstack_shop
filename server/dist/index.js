import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
    res.send("TEST SERVER TEXT");
});
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`-----server starts at port ${PORT}-----`));
    }
    catch (e) {
        console.log(e);
    }
};
start();