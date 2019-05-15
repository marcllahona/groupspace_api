const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const { permissions } = require('./utils/permissions');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');
const Group = require('./resolvers/Group');
const Channel = require('./resolvers/Channel');
const Message = require('./resolvers/Message');
const User = require('./resolvers/User');

const server = new GraphQLServer({
  typeDefs: 'src/schemas/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Group,
    Channel,
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
