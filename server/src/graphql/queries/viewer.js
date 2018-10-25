import { GraphQLObjectType, GraphQLInt } from "graphql";
import { nodeDefinitions, globalIdField } from "graphql-relay";

const types = [];

const registerType = type => {
  types[type.name] = type;
  return type;
};

export const {
  nodeInterface: NodeInterface,
  nodeField: node
} = nodeDefinitions(
  async (globalId, context) => context.getNode(globalId),
  obj => types[obj.__typename]
);

const UserType = registerType(
  new GraphQLObjectType({
    name: "User",
    interfaces: () => [NodeInterface],
    fields: () => ({
      id: globalIdField("User"),
      value: {
        type: GraphQLInt,
        resolve: source => 1
      }
    })
  })
);

export default {
  type: UserType,
  resolve: source => source
};
