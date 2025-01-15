import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import docsRoutes from "./routes/docsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploads = multer({ storage });
app.use("/uploads", express.static("uploads"));

app.post("/upload", uploads.single("image"), (req, res) => {
    res.send({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.use("/docs", docsRoutes);
app.use("/auth", usersRoutes);

mongoose
    .connect("mongodb://0.0.0.0:27017/")
    .then(() => {
        console.log("Database connection");
    })
    .catch((err) => {
        console.log(`Database error. Error: ${err}`);
    });

app.listen(3002, () => {
    console.log(3002);
});
