const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(post => post.id === postId && post.published);

      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe(_, args, { pubsub }) {
      return pubsub.asyncIterator('post');
    }
  }
};

export { Subscription as default };