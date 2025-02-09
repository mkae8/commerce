import express from "express";
import cors from "cors";

import userRouter from "./routers/users/userRouter";
import productRouter from "./routers/products/productRouter";
import categoryRouter from "./routers/categories/categoryRouter";
import imageUpload from "./routers/imageUpload/imageRouter";

import { connectDataBase } from "./src/database/config";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
connectDataBase();

app.use("/", userRouter, productRouter, categoryRouter, imageUpload);

app.listen(port, () => {
  console.log(`🚀 Server nee deer asna --> http://localhost:${port}`);
});
