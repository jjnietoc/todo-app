import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const secretKey = process.env.SECRET_KEY || "Secret key";

// Verify authentication using token
export const verifyAuthentication: RequestHandler = (req, res, next) => {
  const userToken: string = req.headers.authorization || "";
  
  jwt.verify(userToken, secretKey, (err, payload) => {
    if (err) {
      res.status(401).json("Authentication failed.");
      next(err);

    } else {
      res.locals.user_id = (payload as any).id;
      res.locals.isAdmin = (payload as any).isAdmin;
      next();
    }
  });
};

// Verify if user is administrator
export const isAdministrator: RequestHandler = (_req, res, next) => {
  if (res.locals.isAdmin) {
    next();

  } else {
    res.status(403).json("Forbidden.");
    next("Forbidden.");
  }
};
