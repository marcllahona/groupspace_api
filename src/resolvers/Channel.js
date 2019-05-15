const Channel = {
  creator(parent, _args, context) {
    return context.prisma.channel({ id: parent.id }).creator();
  },
  participants(parent, _args, context) {
    return context.prisma.channel({ id: parent.id }).participants();
  },
  messages(parent, _args, context) {
    return context.prisma.channel({ id: parent.id }).messages();
  },
  group(parent, _args, context) {
    return context.prisma.channel({ id: parent.id }).group();
  }
};
