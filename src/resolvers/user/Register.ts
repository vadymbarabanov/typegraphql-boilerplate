import { Resolver, Query } from "type-graphql"

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  register() {
    return "user"
  }
}
