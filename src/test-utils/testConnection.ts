import { createConnection } from "typeorm";

export const testConnection = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "hungtrn1996",
    database: "type_graphql",
    synchronize: drop,
    dropSchema: drop,
    entities: ["src/entity/*.*"]
  });
};
