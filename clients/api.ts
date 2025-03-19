import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const graphqlClient = new GraphQLClient(
    "http://localhost:8000/graphql",
    {
        headers: () => ({
            Authentication: isClient ? `Bearer ${window.localStorage.getItem("__twitter_token")}` : "",
        }),
    }
);