const Message = {
  meeting(parent, _args, context) {
    return context.prisma.message({ id: parent.id }).meeting();
  },
  author(parent, _args, context) {
    return context.prisma.message({ id: parent.id }).author();
  }
};

module.exports = Message;
