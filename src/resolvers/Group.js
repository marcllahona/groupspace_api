const Group = {
  creator(parent, _args, context) {
    return context.prisma.group({ id: parent.id }).creator();
  },
  participants(parent, _args, context) {
    return context.prisma.group({ id: parent.id }).participants();
  },
  channels(parent, _args, context) {
    return context.prisma.group({ id: parent.id }).channels();
  },
  topics(parent, _args, context) {
    return context.prisma.group({ id: parent.id }).topics();
  }
};

module.exports = Group;
