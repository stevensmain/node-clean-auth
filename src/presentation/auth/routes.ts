import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const controller = new AuthController();

    // Auth routes
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
