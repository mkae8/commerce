import { Router } from "express";
import { categoryCreate } from "../../controllers/categoriesController/categoryCreate";
import { fetchCategories } from "../../controllers/categoriesController/fetchCategories";

const categoryRouter = Router();

categoryRouter.route("/category").post(categoryCreate);
categoryRouter.route("/fetchCategories").get(fetchCategories);

export default categoryRouter;
