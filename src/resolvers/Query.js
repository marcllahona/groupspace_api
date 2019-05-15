const { getToken } = require('../utils/auth');

const Query = {
  me: async (_parent, _args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({
      id
    });
  },
  myGroups: async (_parent, args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({ id }).groups({
      ...args
    });
  },
  myCreatedGroups: async (_parent, args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({ id }).createdGroups({
      ...args
    });
  },
  allGroups: async (_parent, args, context) => {
    return await context.prisma.groups({
      ...args
    });
  },
  groupByID: async (_parent, { id }, context) => {
    return await context.prisma.group({
      id
    });
  },
  groupByName: async (_parent, { name }, context) => {
    return await context.prisma.group({
      name
    });
  },
  myChannels: async (_parent, args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({ id }).channels({
      ...args
    });
  },
  myCreatedChannels: async (_parent, args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({ id }).createdChannels({
      ...args
    });
  },
  allChannels: async (_parent, args, context) => {
    const id = getToken(context).id;
    return await context.prisma.channels({
      ...args
    });
  },
  channelByID: async (_parent, { id }, context) => {
    return await context.prisma.channel({
      id
    });
  },
  channelByGroup: async (_parent, { channelName, groupName }, context) => {
    const [channel] = await context.prisma.channels({
      where: {
        name: channelName,
        group: {
          name: groupName
        }
      }
    });
    if (!channel) {
      throw Error('This channel does not exists!');
    }
    return channel;
  },
  channelMessages: async (_parent, { id, ...args }, context) => {
    return await context.prisma.channel({ id }).messages({
      orderBy: 'createdAt_DESC',
      ...args
    });
  },
  channelMessagesByName: async (
    _parent,
    { channelName, groupName, ...args },
    context
  ) => {
    return await context.prisma.messages({
      where: {
        channel: {
          name: channelName,
          group: {
            name: groupName
          }
        }
      },
      orderBy: 'createdAt_DESC',
      ...args
    });
  },
  groupMessages: async (_parent, { name, ...args }, context) => {
    return await context.prisma.messages({
      where: {
        channel: {
          group: {
            name
          }
        }
      },
      orderBy: 'createdAt_DESC',
      ...args
    });
  }
};

module.exports = Query;
