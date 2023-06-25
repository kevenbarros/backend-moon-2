import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface CustomRequest extends Request {
  sub?: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
) => {
  let token: string = String(req?.headers?.token || "");

  if (token) {
    jwt.verify(token, "admin", async (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: error.message,
          error,
        });
        console.log("entra ?")
      }

      const user = await User.findOne({ _id: decoded?.sub });

      if (!user)
        return res.status(403).json({
          messagem: "forBidden",
        });

      req.headers.user = decoded?.sub as string;

      // next();
    });
  } else {
    return res.status(401).json({
      messagem: "Unauthorized",
    });
  }
};

export default authMiddleware;
