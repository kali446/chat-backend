import { Router } from "express";
import AccountController from "../controllers/account";
import passport from "passport";

class AccountRouter {
  private accountRouter;
  private accountController;

  constructor() {
    this.accountRouter = Router();
    this.accountController = new AccountController();
  }

  init() {
    this.accountRouter.get("/signup", this.accountController.signupHandler);
    this.accountRouter.get("/login", this.accountController.loginHandler);

    this.accountRouter.get(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
      })
    );
    this.accountRouter.get(
      "/oauth/google",
      passport.authenticate("google"),
      this.accountController.googleOauthHandler
    );

    this.accountRouter.get("/facebook", passport.authenticate("facebook"));
    this.accountRouter.get(
      "/oauth/facebook",
      passport.authenticate("facebook"),
      this.accountController.facebookOauthHandler
    );

    return this.accountRouter;
  }
}

export default AccountRouter;
