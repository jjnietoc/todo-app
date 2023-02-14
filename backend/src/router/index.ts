import { todoRouter, userRouter } from "../components";

const routes = [
    ["todos", todoRouter],
    ["users", userRouter]
]

export const router = (app:any) => {
    routes.forEach(([path, controller]) => 
    app.use(`/api/${path}`, controller))
    ;
};