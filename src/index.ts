import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import dotenv from "dotenv";
import { createSchema } from "./utils/createSchema";

const main = async () => {
  await createConnection();
  dotenv.config();
  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = express();
  const PORT = process.env.PORT_SERVER || 4000;
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app, path: "/graphql" });
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main();
