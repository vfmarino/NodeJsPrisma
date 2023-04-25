import Router from "@koa/router";
import UserController from "./controller/user";
import auth from "./controller/auth"

const unprotectedRouter = new Router();

unprotectedRouter.post("/users", UserController.create);

// AuthRoutes
unprotectedRouter.post("/auth/login", auth.login);
unprotectedRouter.post("/auth/logout", auth.logout);

export { unprotectedRouter };