import express from "express";
import graphqlHTTP from "express-graphql";
import http from "http";

import graphqlSchema from "./graphql";

const PORT = 3002;

//
const app = express();
const server = http.createServer(app);

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// GraphQL
const graphqlServer = graphqlHTTP(async req => {
  const viewer = { name: "guest" };

  await sleep(1000);

  return {
    schema: graphqlSchema,
    rootValue: viewer,
    pretty: true,
    graphiql: true
  };
});

app.use("/graphql", graphqlServer);

//
server.listen(PORT, function() {
  console.log(`Find the server at: http://localhost:${PORT}/`);
});
