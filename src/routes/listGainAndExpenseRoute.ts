import { Router } from "express";
import { allList } from "../controllers/listGainAndExpense"

function listGainAndExpense(router: Router): void {
  router.post("/generalList/all", allList); // todas os ganho e despesas
}
export { listGainAndExpense } 
