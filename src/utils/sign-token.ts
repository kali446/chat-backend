import jsonwebtoken from "jsonwebtoken";
import config from "config";

export const signToken = (id: string) => {
  return jsonwebtoken.sign({ id }, config.get("jwtSecret"), {
    expiresIn: config.get("jwtExpiresIn"),
  });
};
