import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const secret_key = process.env.SECRET_KEY || "Secret key";

export const verifyAuthentication: RequestHandler = (
  req,
  res,
  next
) => {
  const userToken: string = req.headers.authorization || "";
  jwt.verify(userToken, secret_key, (err, payload) => {
    if (err) {
      res.status(401).json("Authentication failed.");
      next(err)
    } else {
      res.locals.user_id = (payload as any).id;
      res.locals.isAdmin = (payload as any).isAdmin;
      next()
    }
  });
}

export const isAdministrator: RequestHandler = (
  req,
  res, 
  next
) => {
  if (res.locals.isAdmin) {
    next()
  } else {
    res.status(403).json("Forbidden.");
    next("Forbidden.")
  }
}