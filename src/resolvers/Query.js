const { getToken } = require('../utils/auth');

const Query = {
  me: async (_parent, _args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({
      id
    });
  }
};

module.exports = Query;
