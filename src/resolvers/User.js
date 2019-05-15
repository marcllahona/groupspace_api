const User = {
  fullName(parent, _args, context) {
    return `${parent.firstName} ${parent.lastName}`;
  },
  groups(parent, _args, context) {
    return context.prisma.user({ id: parent.id }).groups();
  },
  createdGroups(parent, _args, context) {
    return context.prisma.user({ id: parent.id }).createdGroups();
  },
  channels(parent, _args, context) {
    return context.prisma.user({ id: parent.id }).channels();
  },
  createdChannels(parent, _args, context) {
    return context.prisma.user({ id: parent.id }).channels();
  },
  messages(parent, _args, context) {
    return context.prisma.user({ id: parent.id }).messages();
  }
};

module.exports = User;
