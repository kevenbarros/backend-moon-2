import { Router } from "express";
import { createGoal, allList, getOneGoal } from "../controllers/goal"
import authMiddleware from "../middleware/authMiddleware"

function goalRoute(router: Router): void {
  router.post("/goal/all", allList);
  router.post("/goal/create", createGoal);
  router.get("/goal/:id", getOneGoal)
}
export { goalRoute } 
