import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(_, args, { db }) {
    const emailTaken = db.users.some(user => user.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email taken');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(_, args, { db }) {
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
        throw new Error('User not found');
    }

    const deletedUsers = db.users.splice(userIndex, 1)

    posts = db.posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });
    db.comments = db.comments.filter(comment => comment.author !== args.id);

    return deletedUsers[0]
  },
  createPost(_, args, { db }) {
    const userExists = db.users.some(user => user.id === args.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const post = {
      id: uuidv4(),
      title: args.title,
      body: args.body,
      published: args.published,
      author: args.author
    };

    db.posts.push(post);

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPosts = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== args.id);

    return deletedPosts[0];
  },
  createComment(_, args, { db }) {
    const userExists = db.users.some(user => user.id === args.author);
    const postExists = db.posts.some(post => post.id === args.post && post.published);

    if (!userExists) {
      throw new Error('User not found');
    }

    if (!postExists) {
      throw new Error('Post not found');
    }

    const comment = {
      id: uuidv4(),
      text: args.text,
      author: args.author,
      post: args.post
    };

    db.comments.push(comment);

    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  }
};

export { Mutation as default };