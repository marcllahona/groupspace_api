const Meeting = {
  participants(parent, _args, context) {
    return context.prisma.meeting({ id: parent.id }).participants();
  },
  messages(parent, _args, context) {
    return context.prisma.meeting({ id: parent.id }).messages();
  }
};

module.exports = Meeting;
