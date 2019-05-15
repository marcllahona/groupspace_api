const Subscription = {
  onCreateChannel: {
    subscribe: async (_parent, { groupID }, context) => {
      return await context.prisma.$subscribe
        .channel({
          node: {
            group: {
              id: groupID
            }
          },
          mutation_in: ['CREATED']
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  },
  onCreateGroupMessage: {
    subscribe: async (_parent, { name }, context) => {
      return await context.prisma.$subscribe
        .message({
          node: {
            channel: {
              group: {
                name
              }
            }
          },
          mutation_in: ['CREATED']
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  },
  onCreateMessage: {
    subscribe: async (_parent, { channelID }, context) => {
      return await context.prisma.$subscribe
        .message({
          node: {
            channel: {
              id: channelID
            }
          },
          mutation_in: ['CREATED']
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  },
  onCreateMessageByName: {
    subscribe: async (_parent, { channelName, groupName }, context) => {
      return await context.prisma.$subscribe
        .message({
          node: {
            channel: {
              name: channelName,
              group: {
                name: groupName
              }
            }
          },
          mutation_in: ['CREATED']
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  }
  // onCreateMessageByMeetingID: {
  //   subscribe: async (_parent, { id }, context) => {
  //     return await context.prisma.$subscribe
  //       .message({
  //         node: {
  //           meeting: {
  //             id
  //           }
  //         },
  //         mutation_in: ['CREATED', 'DELETED']
  //       })
  //       .node();
  //   },
  //   resolve: payload => {
  //     return payload;
  //   }
  // },
  // onCreateMessageByMeetingName: {
  //   subscribe: async (_parent, { name }, context) => {
  //     return await context.prisma.$subscribe
  //       .message({
  //         node: {
  //           meeting: {
  //             name
  //           }
  //         },
  //         mutation_in: ['CREATED', 'DELETED']
  //       })
  //       .node();
  //   },
  //   resolve: payload => {
  //     return payload;
  //   }
  // },
  // onAddParticipantToMeetingByName: {
  //   subscribe: async (_parent, { name }, context) => {
  //     return await context.prisma.$subscribe
  //       .meeting({
  //         node: {
  //           name
  //         },
  //         mutation_in: ['CREATED', 'DELETED']
  //       })
  //       .node();
  //   },
  //   resolve: payload => {
  //     return payload;
  //   }
  // }
};

module.exports = Subscription;
