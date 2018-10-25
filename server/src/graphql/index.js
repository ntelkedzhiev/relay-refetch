import { GraphQLSchema } from "graphql";

import query from "./queries";

const Schema = new GraphQLSchema({
  query
});

export default Schema;
