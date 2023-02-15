"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdministrator = exports.verifyAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_key = process.env.SECRET_KEY || "Secret key";
const verifyAuthentication = (req, res, next) => {
    const userToken = req.headers.authorization || "";
    jsonwebtoken_1.default.verify(userToken, secret_key, (err, payload) => {
        if (err) {
            res.status(401).json("Authentication failed.");
            next(err);
        }
        else {
            res.locals.user_id = payload.id;
            res.locals.isAdmin = payload.isAdmin;
            next();
        }
    });
};
exports.verifyAuthentication = verifyAuthentication;
const isAdministrator = (req, res, next) => {
    if (res.locals.isAdmin) {
        next();
    }
    else {
        res.status(403).json("Forbidden.");
        next("Forbidden.");
    }
};
exports.isAdministrator = isAdministrator;
//# sourceMappingURL=authenticate.js.map