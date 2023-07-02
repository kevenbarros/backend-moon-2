import { Router } from "express";
import { userRoute } from "./userRoute";
import { gainRoute } from "./gainRoute";
import { expenseRoute } from "./expenseRoute";
import { listGainAndExpense } from "./listGainAndExpenseRoute"
import { categoriesRoute } from "./categoriesRoutes"
import { goalRoute } from "./goalRoutes";
import { goalRecurrenceRoute } from "./goalRecurrenceRoutes"
const router = Router();

export function routesModule() {
  userRoute(router)
  gainRoute(router)
  expenseRoute(router)
  listGainAndExpense(router)
  categoriesRoute(router)
  goalRoute(router)
  goalRecurrenceRoute(router)
  return router;
}
