const { shield } = require('graphql-shield');
const { isUser } = require('./rules');

const permissions = shield({
  Query: {
    me: isUser,
    myGroups: isUser,
    myCreatedGroups: isUser,
    myChannels: isUser,
    myCreatedChannels: isUser,
    channelMessages: isUser
  },
  Mutation: {
    createGroup: isUser,
    updateGroup: isUser,
    deleteGroup: isUser,
    leaveGroup: isUser
  },
  Subscription: {}
});

exports.permissions = permissions;
