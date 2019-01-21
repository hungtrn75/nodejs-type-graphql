import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolvers } from "./modules/user/Register";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolvers]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });
  const app = express();

  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });
};

main();
