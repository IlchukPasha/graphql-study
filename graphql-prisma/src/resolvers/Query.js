const Query = {
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(_, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          body_contains: args.query
        }]
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(_, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  me() {
    return {
      id: '3454353456',
      email: 'email@mail.com',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName',
      age: 25
    };
  },
  post() {
    return {
      id: '43534543',
      title: 'title',
      body: 'text',
      published: true
    };
  },
};

export { Query as default };