import { Router } from "express";
import { categoryCreate } from "../../controllers/categoriesController/categoryCreate";

const categoryRouter = Router();
categoryRouter.route("/category").post(categoryCreate);

export default categoryRouter;
