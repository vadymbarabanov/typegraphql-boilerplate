import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import express from "express"
import { createConnection } from "typeorm"

import { RegisterResolver } from "./resolvers/user/Register"

const PORT = process.env.PORT || 5000

const main = async () => {
  await createConnection()

  // Creating GraphQL schema
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  })

  const apolloServer = new ApolloServer({ schema })

  const app = express()
  apolloServer.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`💫 Server started on http://localhost:${PORT}/graphql`)
  })
}
main()
