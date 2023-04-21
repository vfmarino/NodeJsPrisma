import Router from "@koa/router";
//import auth from "./controller/auth"

const unprotectedRouter = new Router();


// AuthRoutes
/*unprotectedRouter.post("/auth/login", auth.login);
unprotectedRouter.post("/auth/logout", auth.logout);
*/
export { unprotectedRouter };