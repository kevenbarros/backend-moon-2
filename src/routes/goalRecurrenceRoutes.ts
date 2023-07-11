import { Router } from "express";
import { createGoalRecurrence, allList, getRecurrence } from "../controllers/goalRecurrence"

function goalRecurrenceRoute(router: Router): void {
  router.post("/goal/recurrence/all", allList);
  router.get("/goal/recurrence/:id", getRecurrence);
  router.post("/goal/recurrence/create", createGoalRecurrence);
}
export { goalRecurrenceRoute } 
