const Subscription = {
  onCreateMessageByMeetingID: {
    subscribe: async (_parent, { id }, context) => {
      return await context.prisma.$subscribe
        .message({
          node: {
            meeting: {
              id
            }
          },
          mutation_in: ['CREATED', 'DELETED']
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  },
  onCreateMessageByMeetingName: {
    subscribe: async (_parent, { name }, context) => {
      return await context.prisma.$subscribe
        .message({
          node: {
            meeting: {
              name
            }
          },
          mutation_in: ['CREATED', 'DELETED']
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  }
};

module.exports = Subscription;
