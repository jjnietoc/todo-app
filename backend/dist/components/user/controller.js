"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.login = exports.signup = exports.getOneUser = exports.findAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const datasource_1 = __importDefault(require("../../datasource"));
const secret_key = process.env.SECRET_KEY || "Secret key";
// GET all users
const findAllUsers = async (req, res) => {
    try {
        const users = await datasource_1.default.user.findMany({
            include: {
                todos: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findAllUsers = findAllUsers;
// GET user by id
const getOneUser = async (req, res) => {
    try {
        const user_id = Number(req.params.idUser);
        const user = await datasource_1.default.user.findUnique({
            where: {
                id: user_id,
            },
            include: {
                todos: true,
            },
        });
        res.json({ ok: true, body: user });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};
exports.getOneUser = getOneUser;
// POST signup data
const signup = async (req, res) => {
    try {
        const data = req.body;
        data.last_session = data.last_session || null;
        const encrypted_password = await bcrypt_1.default.hash(data.password, 10);
        const new_user = {
            name: data.name,
            email: data.email,
            password: encrypted_password,
            last_session: new Date(data.last_session),
        };
        const user = await datasource_1.default.user.create({ data: new_user });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
            expiresIn: 86400,
        });
        res.status(201).json({
            user,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};
exports.signup = signup;
// POST login data
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await datasource_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user == null) {
            res.status(400).json({ ok: false, message: "Incorrect email." });
        }
        else {
            const is_valid = await bcrypt_1.default.compare(password, user.password);
            if (is_valid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, secret_key, {
                    expiresIn: 86400,
                });
                user.password = "";
                const isAdmin = user.isAdmin;
                res.status(201).json({ user, token, isAdmin });
            }
            else {
                res.status(400).json({ ok: false, message: "Incorrect password." });
            }
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.login = login;
// UPDATE user data by id
const updateUser = async (req, res) => {
    try {
        const id = Number(req.params.idUser);
        const user = await datasource_1.default.user.update({
            where: { id },
            data: req.body,
        });
        res.json({ ok: true, body: user, message: "User updated succesfully." });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};
exports.updateUser = updateUser;
// REMOVE user by id
const removeUser = async (req, res) => {
    try {
        const id = Number(req.params.idUser);
        await datasource_1.default.user.delete({
            where: { id },
        });
        res.status(204).json({ ok: true, body: "", message: "User deleted." });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};
exports.removeUser = removeUser;
//# sourceMappingURL=controller.js.map