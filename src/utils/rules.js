const { rule } = require('graphql-shield');
const { getToken } = require('./auth');

const isUser = rule({ cache: 'contextual' })(
  async (_parent, _args, context) => {
    const token = getToken(context);
    //Check if there is a user with this ID in the database
    return context.prisma.$exists.user({ id: token.id });
  }
);

exports.isUser = isUser;
