const { compare, hash } = require('bcryptjs');
const { createToken, getToken } = require('../utils/auth');

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
  createGroup: async (
    _parent,
    { name, url, category, description },
    context
  ) => {
    const id = getToken(context).id;
    return await context.prisma.createGroup({
      creator: {
        connect: {
          id
        }
      },
      participants: {
        connect: [
          {
            id
          }
        ]
      },
      name,
      url,
      category,
      description
    });
  },

  updateGroup: async (_parent, { id, ...args }, context) => {
    const userID = getToken(context).id;
    const [group] = await context.prisma.groups({
      where: {
        AND: [{ id }, { creator: { id: userID } }]
      }
    });

    if (!group) {
      throw Error("You don't have privileges to edit thie group!");
    }

    return await context.prisma.updateGroup({
      where: {
        id
      },
      data: {
        ...args
      }
    });
  },
  deleteGroup: async (_parent, { id, ...args }, context) => {
    const userID = getToken(context).id;
    const [group] = await context.prisma.groups({
      where: {
        AND: [{ id }, { creator: { id: userID } }]
      }
    });

    if (!group) {
      throw Error("You don't have privileges to delete this group!");
    }

    return await context.prisma.deleteGroup({
      id
    });
  },
  leaveGroup: async (_parent, { id }, context) => {
    const userID = getToken(context).id;
    const [group] = await context.prisma.groups({
      where: {
        AND: [{ id }, { creator: { id: userID } }]
      }
    });

    if (!group) {
      throw Error('You do not belong to this group!');
    }

    return await context.prisma.updateGroup({
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
  createChannel: async (_parent, { creatorID, groupID, name }, context) => {
    return await context.prisma.createChannel({
      creator: {
        connect: {
          id: creatorID
        }
      },
      participants: {
        connect: [
          {
            id: creatorID
          }
        ]
      },
      group: {
        connect: {
          id: groupID
        }
      },
      name
    });
  },
  updateChannel: async (_parent, { id, ...args }, context) => {
    const userID = getToken(context).id;
    const [channel] = await context.prisma.channels({
      where: {
        AND: [{ id }, { creator: { id: userID } }]
      }
    });
    if (!channel) {
      throw Error("You don't have privileges to edit this channel!");
    }

    return context.prisma.editChannel({
      where: {
        id
      },
      data: {
        ...args
      }
    });
  },
  deleteChannel: async (_parent, { id, ...args }, context) => {
    const userID = getToken(context).id;
    const [channel] = await context.prisma.channels({
      where: {
        AND: [{ id }, { creator: { id: userID } }]
      }
    });

    if (!channel) {
      throw Error("You don't have privileges to delete this channel!");
    }

    return await context.prisma.deleteChannel({
      where: {
        id
      },
      data: {
        ...args
      }
    });
  },
  leaveChannel: async (_parent, { id }, context) => {
    const userID = getToken(context).id;
    const [channel] = await context.prisma.channels({
      where: {
        AND: [{ id }, { creator: { id: userID } }]
      }
    });

    if (!channel) {
      throw Error("You don't have privileges to delete this channel!");
    }

    return await context.prisma.updateChannel({
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
  createMessage: async (_parent, { authorID, channelID, content }, context) => {
    return await context.prisma.createMessage({
      author: {
        connect: {
          id: authorID
        }
      },
      channel: {
        connect: {
          id: channelID
        }
      },
      content
    });
  },
  createMessageByName: async (
    _parent,
    { channelName, groupName, content },
    context
  ) => {
    const id = getToken(context).id;
    const [channel] = await context.prisma.channels({
      where: {
        name: channelName,
        group: {
          name: groupName
        }
      }
    });

    if (!channel) {
      throw Error('Message cannot be create in this Channel');
    }
    return await context.prisma.createMessage({
      author: {
        connect: {
          id
        }
      },
      channel: {
        connect: {
          id: channel.id
        }
      },
      content
    });
  }
};

module.exports = Mutation;
