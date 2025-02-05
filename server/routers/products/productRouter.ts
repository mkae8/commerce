import { Router } from "express";
import { productCreate } from "../../controllers/productController/productCreate";

const productRouter = Router();

productRouter.route("/product/create").post(productCreate);

export default productRouter;
