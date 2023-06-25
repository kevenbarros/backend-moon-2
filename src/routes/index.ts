import { Router } from "express";
import { userRoute } from "./userRoute";
import { gainRoute } from "./gainRoute";
import { expenseRoute } from "./expenseRoute";
import { listGainAndExpense } from "./listGainAndExpenseRoute"
const router = Router();

export function routesModule() {
  userRoute(router)
  gainRoute(router)
  expenseRoute(router)
  listGainAndExpense(router)
  return router;
}
