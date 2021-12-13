import { URL } from "consts";
import { GraphQLClient } from "graphql-request";

export const BACKEND_CLIENT = new GraphQLClient(URL);
