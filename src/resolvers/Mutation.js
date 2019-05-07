const { compare, hash } = require('bcryptjs');
const { randomBytes } = require('crypto');
const { createToken } = require('../utils/auth');

const Mutation = {
  login: async (_parent, { email, password }, context) => {
    //1. Check if there is a user with that email
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if the password is correct
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password!`);
    }
    // 3. Generate JWT Token
    const token = createToken(user.id, user.email);

    // 4.Return JWT and User with AuthPayload
    return {
      token,
      user
    };
  },
  register: async (_parent, args, context) => {
    //1.Lowercase email
    args.email = args.email.toLowerCase();

    //2.Hash the password
    const hashedPassword = await hash(args.password, 10);

    //3. Create the User in the database
    const user = await context.prisma.createUser({
      ...args,
      email: args.email,
      password: hashedPassword
    });

    //4.Generate JWT
    const token = createToken(user.id, user.email);

    //5.Return JWT and User with AuthPayload
    return {
      token,
      user
    };
  },
  startMeetingWithName: async (_parent, { name, userID }, context) => {
    const meetingExists = await context.prisma.$exists.meeting({ name });

    //If exists a meeting with this name, then user will ONLY join the meeting
    if (meetingExists) {
      return await context.prisma.updateMeeting({
        where: {
          name
        },
        data: {
          participants: {
            connect: {
              id: userID
            }
          }
        }
      });
    }
    //If does not exists a meeting with code, then user will create and join meeting
    else {
      return await context.prisma.createMeeting({
        name,
        participants: {
          connect: {
            id: userID
          }
        }
      });
    }
  },
  startMeeting: async (_parent, { userID }, context) => {
    //1. We generate a new unique name for meeting
    let name;
    let invalidName = true;
    while (invalidName) {
      name = randomBytes(10).toString('hex');
      invalidName = await context.prisma.$exists.meeting({ name });
    }
    //2. Create new meeting with name
    return await context.prisma.createMeeting({
      name,
      participants: {
        connect: {
          id: userID
        }
      }
    });
  },

  leaveMeetingByID: async (_parent, { userID, id }, context) => {
    const meetingExists = await context.prisma.$exists.meeting({
      id
    });

    if (!meetingExists) {
      throw Error('Meeting does not exist!');
    }
    //2. Create new meeting with name
    return await context.prisma.updateMeeting({
      where: {
        id
      },
      data: {
        participants: {
          disconnect: {
            id: userID
          }
        }
      }
    });
  },

  leaveMeetingByName: async (_parent, { userID, name }, context) => {
    const meetingExists = await context.prisma.$exists.meeting({
      name
    });

    if (!meetingExists) {
      throw Error('Meeting does not exist!');
    }
    //2. Create new meeting with name
    return await context.prisma.updateMeeting({
      where: {
        name
      },
      data: {
        participants: {
          disconnect: {
            id: userID
          }
        }
      }
    });
  },

  deleteMeeting: async (_parent, { meetingID }, context) => {
    const meetingExists = await context.prisma.$exists.meeting({
      id: meetingID
    });

    if (!meetingExists) {
      throw Error('Meeting does not exist!');
    }
    //2. Create new meeting with name
    return await context.prisma.deleteMeeting({
      id: meetingID
    });
  },
  createMessageByMeetingID: async (
    _parent,
    { content, authorID, id },
    context
  ) => {
    return await context.prisma.createMessage({
      content,
      meeting: {
        connect: {
          id
        }
      },
      author: {
        connect: {
          id: authorID
        }
      }
    });
  },
  createMessageByMeetingName: async (
    _parent,
    { content, authorID, name },
    context
  ) => {
    return await context.prisma.createMessage({
      content,
      meeting: {
        connect: {
          name
        }
      },
      author: {
        connect: {
          id: authorID
        }
      }
    });
  }
};

module.exports = Mutation;
