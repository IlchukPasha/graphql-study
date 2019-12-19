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
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(user => user.id === id);
    console.log('db.users start ', db.users);
    console.log('user start', user);

    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email);

      if (emailTaken) {
        throw new Error('Email taken');
      }

      user.email = data.email;
    }

    if (typeof data.password === 'string') {
      user.password = data.password;
    }

    if (typeof data.firstName === 'string') {
      user.firstName = data.firstName;
    }

    if (typeof data.lastName === 'string') {
      user.lastName = data.lastName;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    console.log('db.users finish ', db.users);
    console.log('user finish', user);

    return user;
  },
  createPost(_, args, { db, pubsub }) {
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

    if (args.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      });
    }

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== args.id);

    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post
        }
      });
    }

    return post;
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.publish && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        });
      } else if (!originalPost.publish && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        });
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      });
    }

    return post;
  },
  createComment(_, args, { db, pubsub }) {
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

    pubsub.publish(`comment ${args.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    });

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    });

    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    });

    return comment;
}
};

export { Mutation as default };