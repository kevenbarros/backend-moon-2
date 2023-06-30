import { Router } from "express";
import { getAllUsers, login, register, checkUser, saveWage } from "../controllers/user"
import authMiddleware from "../middleware/authMiddleware"

function userRoute(router: Router): void {
  router.get("/user/getall", getAllUsers);
  router.post("/user/check", checkUser)
  router.post("/user/register", register);
  router.post("/user/login", login);
  router.post("/user/wage", saveWage);
  router.post("/token", authMiddleware)
}
export { userRoute } 
