const User = {
  meeting(parent, _args, context) {
    return context.prisma.user({ id: parent.id }).meeting();
  }
};

module.exports = User;
