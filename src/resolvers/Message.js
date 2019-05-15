const Message = {
  channel(parent, _args, context) {
    return context.prisma.message({ id: parent.id }).channel();
  },
  author(parent, _args, context) {
    return context.prisma.message({ id: parent.id }).author();
  }
};

module.exports = Message;
