import { Neo4jGraphQL } from "@neo4j/graphql"
import { ApolloServer, gql } from "apollo-server"
import neo4j from "neo4j-driver"
import { Neo4jGraphQLAuthJWKSPlugin } from "@neo4j/graphql-plugin-auth"
import * as dotenv from "dotenv"

dotenv.config()

const typeDefs = gql`
  type Todo {
    author: ID!
    title: String!
    done: Boolean!
    starred: Boolean!
    priority: Int!
    description: String
    dueDate: String
  }
  type User {
    id: ID!
    name: String!
  }
  extend type User
    @auth(
      rules: [
        { operations: [UPDATE], bind: { id: "$jwt.sub" } }
        { operations: [READ], allow: { id: "$jwt.sub" } }
      ]
    )
  extend type Todo
    @auth(
      rules: [
        { operations: [UPDATE], bind: { author: "$jwt.sub" } }
        { where: { author: "$jwt.sub" } }
      ]
    )
`

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
)

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  plugins: {
    auth: new Neo4jGraphQLAuthJWKSPlugin({
      jwksEndpoint: "https://www.googleapis.com/oauth2/v3/certs",
    }),
  },
})

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  })
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
})
