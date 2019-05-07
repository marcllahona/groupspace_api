const { shield } = require('graphql-shield');
const { isUser } = require('./rules');

const permissions = shield({
  Query: {
    me: isUser
  },
  Mutation: {},
  Subscription: {}
});

exports.permissions = permissions;
