import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { globalIdField } from "graphql-relay";

import viewer, { node } from "./viewer";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    fromCache: {
      type: GraphQLBoolean,
      resolve: () => false
    },
    node,
    viewer,
    relay: {
      id: globalIdField("relay"),
      type: new GraphQLNonNull(RootQuery),
      resolve: () => ({})
    }
  })
});

export default RootQuery;
