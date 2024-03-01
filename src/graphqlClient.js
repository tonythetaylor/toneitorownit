import { GraphQLClient } from "graphql-request";

const { EXPO_PUBLIC_GRAPHQL_API_KEY, EXPO_PUBLIC_GRAPHQL_ENDPOINT } =
  process.env;
const url = EXPO_PUBLIC_GRAPHQL_ENDPOINT;

const client = new GraphQLClient(url, {
  headers: {
    Authorization: `apikey ${EXPO_PUBLIC_GRAPHQL_API_KEY}`,
  },
});

export default client;
