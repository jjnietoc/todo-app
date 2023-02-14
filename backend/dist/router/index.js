"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const components_1 = require("../components");
const routes = [
    ["todos", components_1.todoRouter],
    ["users", components_1.userRouter]
];
const router = (app) => {
    routes.forEach(([path, controller]) => app.use(`/api/${path}`, controller));
};
exports.router = router;
//# sourceMappingURL=index.js.map