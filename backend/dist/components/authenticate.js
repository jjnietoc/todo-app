"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyAuthentication(req, secret_key) {
    const userToken = req.headers.authorization || '';
    let is_verified = true;
    jsonwebtoken_1.default.verify(userToken, secret_key, (err, payload) => {
        if (err) {
            is_verified = false;
        }
    });
    return is_verified;
}
exports.verifyAuthentication = verifyAuthentication;
//# sourceMappingURL=authenticate.js.map