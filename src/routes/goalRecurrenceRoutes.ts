import { Router } from "express";
import { createGoalRecurrence, allList } from "../controllers/goalRecurrence"

function goalRecurrenceRoute(router: Router): void {
  router.post("/goal/recurrence/all", allList);
  router.post("/goal/recurrence/create", createGoalRecurrence);
}
export { goalRecurrenceRoute } 
