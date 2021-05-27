import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import { buildSchema, Resolver, Query } from "type-graphql"
import express from "express"

const PORT = process.env.PORT || 4000

@Resolver()
class User {
  @Query(() => String)
  getUser() {
    return "user"
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [User],
  })
  const apolloServer = new ApolloServer({ schema })
  const app = express()
  apolloServer.applyMiddleware({ app })
  app.listen(PORT, () => {
    console.log(`💫 Server started on http://localhost:${PORT}/graphql`)
  })
}
main()
