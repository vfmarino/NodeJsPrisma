import Router from "@koa/router";
import user from "./controller/user";


const protectedRouter = new Router();

// UserRoutes
protectedRouter.put("/users/update/:id", user.update);
protectedRouter.get("/users/email/:email", user.findByEmail);
protectedRouter.get("/users/id/:id", user.findById);
protectedRouter.delete("/users/delete/:id", user.delete);

export { protectedRouter };