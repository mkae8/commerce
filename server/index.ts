import express from "express";
import cors from "cors";

import userRouter from "./routers/users/userRouter";

import { connectDataBase } from "./src/database/config";
// import categoryRouter from "./router/categories/categoryRouter";
// import imageUpload from "./router/imageUpload/imegaUploadRoute";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
connectDataBase();

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`🚀 Server nee deer asna --> http://localhost:${port}`);
});
