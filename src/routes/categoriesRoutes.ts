import { Router } from "express";
import { allList, createCategory } from "../controllers/categories"

function categoriesRoute(router: Router): void {
  router.post("/category/all", allList);
  router.post("/category/create", createCategory);
}
export { categoriesRoute } 
