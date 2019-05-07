const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const { permissions } = require('./utils/permissions');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');
const Meeting = require('./resolvers/Meeting');
const Message = require('./resolvers/Message');
const User = require('./resolvers/User');

const server = new GraphQLServer({
  typeDefs: 'src/schemas/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Meeting,
    Message,
    User
  },
  middlewares: [permissions],
  context: req => ({
    ...req,
    prisma
  })
});

server.start(deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});
