const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.firstName.toLowerCase().includes(args.query.toLowerCase());
    });
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
  posts(_, args, { db }) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
      const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(_, args, { db }) {
    return db.comments;
  }
};

export { Query as default };