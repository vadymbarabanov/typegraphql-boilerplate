import { Resolver, Query, Mutation, Arg } from "type-graphql"
import argon2 from "argon2"
import { User } from "../../entity/User"

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  hello() {
    return "Hello GraphQL"
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const isUserExist = await User.findOne({ where: { email } })
    if (isUserExist) {
      return null
    }
    const hashedPassword = await argon2.hash(password)
    return await User.create({ email, password: hashedPassword }).save()
  }
}
