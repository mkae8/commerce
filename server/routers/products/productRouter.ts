import { Router } from "express";
import { productCreate } from "../../controllers/productController/productCreate";
import { fetchProducts } from "../../controllers/productController/fetchProducts";
const productRouter = Router();

productRouter.route("/product/create").post(productCreate);
productRouter.route("/fetch-products").get(fetchProducts);

export default productRouter;
