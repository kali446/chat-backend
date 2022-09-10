require("dotenv").config({
  path: "./config.env",
});

import express, { Express } from "express";
import config from "config";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieSession from "cookie-session";
import passport from "passport";
import cloudinary from "cloudinary";
import ROUTES from "./routes/base";
import ConnectDB from "./utils/connect-db";
import GlobalErrorHandler from "./controllers/error";
import "./config/passport";

export class App {
  public app: Express;
  public port: number;
  public server: any;
  public mongoConnectionURL: string;

  constructor() {
    this.app = express();
    this.port = config.get<number>("port");
    this.mongoConnectionURL = config.get<string>("dbConnectionURL");
    this.app.use(helmet());
    this.app.use(express.json({ limit: "20kb" }));
    this.app.use(cors());
    this.app.use(
      cookieSession({
        name: "session",
        keys: ["junior"],
        maxAge: 24 * 60 * 60 * 100,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    if (process.env.NODE_ENV) {
      this.app.use(morgan("dev"));
    }

    this.app.use(ROUTES);
    this.app.use(GlobalErrorHandler);
  }

  public run() {
    // connect with cloudinary service
    cloudinary.v2.config({
      cloud_name: config.get("cloudinaryName"),
      api_key: config.get("cloudinaryApiKey"),
      api_secret: config.get("cloudinaryApiSecret"),
    });

    // do the mongodb connection here
    new ConnectDB(this.mongoConnectionURL);

    // run the server
    this.server = this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${this.port}`
      );
    });
  }
}
