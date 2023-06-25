import { Router } from "express";
import { registerGain, getGain, allGain, deleteGain, updateGain } from "../controllers/gain"
import { registerExpense, getExpense, allExpense, deleteExpense, updateExpense} from "../controllers/expense"

function expenseRoute(router: Router): void {
  router.post("/expense/all", allExpense); // todas os gastos
  
  router.get("/expense/get", getExpense); // unico gastos
  
  router.put("/expense/update", updateExpense ) // editar gastos
  
  router.delete("/expense/delete", deleteExpense); // deletar gastos
  
  router.post("/expense/create", registerExpense); // criar gastos
  
}
export { expenseRoute } 
