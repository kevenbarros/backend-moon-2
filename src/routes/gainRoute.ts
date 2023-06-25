import { Router } from "express";
import { registerGain, getGain, allGain, deleteGain, updateGain } from "../controllers/gain"
import authMiddleware from "../middleware/authMiddleware"

function gainRoute(router: Router): void {
  router.get("/gain/all", allGain); // todas os ganho
  router.post("/gain/get", getGain); // unico ganho
  router.put("/gain/update", updateGain ) // editar ganho
  router.delete("/gain/delete", deleteGain); // deletar ganho
  router.post("/gain/create", registerGain); // criar ganho
}
export { gainRoute } 
