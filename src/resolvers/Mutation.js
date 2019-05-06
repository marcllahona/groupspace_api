const { compare, hash } = require('bcryptjs');
const { createToken } = require('../utils/auth');

const Mutation = {
  loginUser: async (_parent, { email, password }, context) => {
    //1. Check if there is a user with that email
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if the password is correct
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password!`);
    }
    // 3. Generate JWT Token
    const token = createToken(user.id, user.email);

    // 4.Return JWT and User with AuthPayload
    return {
      token,
      user
    };
  },
  registerUser: async (_parent, args, context) => {
    //1.Lowercase email
    args.email = args.email.toLowerCase();

    //2.Hash the password
    const hashedPassword = await hash(args.password, 10);

    //3. Create the User in the database
    const user = await context.prisma.createUser({
      ...args,
      email: args.email,
      password: hashedPassword
    });

    //4.Generate JWT
    const token = createToken(user.id, user.email);

    //5.Return JWT and User with AuthPayload
    return {
      token,
      user
    };
  }
};

module.exports = Mutation;
