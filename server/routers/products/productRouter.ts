import { Router } from "express";
import { productCreate } from "../../controllers/productController/productCreate";
import { fetchProducts } from "../../controllers/productController/fetchProducts";
import { deleteProduct } from "../../controllers/productController/deleteProduct";
const productRouter = Router();

productRouter.route("/product/create").post(productCreate);
productRouter.route("/fetch-products").get(fetchProducts);
productRouter.route("/delete/products/:id").delete(deleteProduct);


export default productRouter;
