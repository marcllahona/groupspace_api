const Query = {
  me: async (_parent, _args, context) => {
    // const id = getToken(context).id;
    const id = '';
    return await context.prisma.user({
      id
    });
  }
};

module.exports = Query;
