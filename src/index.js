const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Subscription = require('./resolvers/Subscription');

const server = new GraphQLServer({
  typeDefs: 'src/schemas/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  //   middlewares: [permissions],
  context: req => ({
    ...req,
    prisma
  })
});

server.start(deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});
