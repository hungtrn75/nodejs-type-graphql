import { v4 } from "uuid";
import { redis } from "../../../redis";
import * as types from "../constants/UserAction";

export const createUserUrl = async (userId: number, type: string) => {
  const token = v4();
  await redis.set(type + token, userId, "ex", 60 * 60 * 24); //1day
  switch (type) {
    case types.CONFIRM_EMAIL:
      return `http://localhost:3000/user/confirm/${token}`;
    case types.FORGOT_PASSWORD:
      return `http://localhost:3000/user/reset/${token}`;
    default:
      return `http://localhost:3000/user/confirm/${token}`;
  }
};
