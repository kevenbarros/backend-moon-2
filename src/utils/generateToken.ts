import jwt from "jsonwebtoken";

function generateToken(payload: any) {
  const token = jwt.sign(payload, "admin", {
    expiresIn: "1d",
  });

  return token;
}

export { generateToken };
