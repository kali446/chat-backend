import mongoose from "mongoose";

class ConnectDB {
  url: string;

  constructor(dbConnectionURL: string) {
    this.url = dbConnectionURL;

    mongoose
      .connect(this.url)
      .then((res) =>
        console.log(`⚡️[db-connection]: Database connected: ${this.url}`)
      );
  }
}

export default ConnectDB;
