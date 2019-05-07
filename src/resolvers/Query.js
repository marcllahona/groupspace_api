const { getToken } = require('../utils/auth');

const Query = {
  me: async (_parent, _args, context) => {
    const id = getToken(context).id;
    return await context.prisma.user({
      id
    });
  },
  meeting: async (_parent, _args, context) => {
    const id = getToken(context).id;
    const [meeting] = await context.prisma.meetings({
      where: {
        participants_some: {
          id
        }
      }
    });
    return meeting;
  },
  meetingByID: async (_parent, { id }, context) => {
    return await context.prisma.meeting({
      id
    });
  },
  meetingByName: async (_parent, { name }, context) => {
    return await context.prisma.meeting({
      name
    });
  },
  messagesByMeetingID: async (_parent, { id }, context) => {
    return await context.prisma.messages({
      where: {
        meeting: {
          id
        }
      }
    });
  },
  messagesByMeetingName: async (_parent, { name }, context) => {
    return await context.prisma.messages({
      where: {
        meeting: {
          name
        }
      }
    });
  }
};

module.exports = Query;
