import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    email: '1@mail.com',
    password: 'password',
    firstName: 'firstName 1',
    lastName: 'lastName 1',
    age: 25
  },
  {
    id: '2',
    email: '2@mail.com',
    password: 'password',
    firstName: 'firstName 2',
    lastName: 'lastName 2',
    age: 25
  },
  {
    id: '3',
    email: '3@mail.com',
    password: 'password',
    firstName: 'firstName 3',
    lastName: 'lastName 3',
    age: 25
  }
];

const posts = [
  {
    id: '1',
    title: 'Post 1',
    body: 'Body 1',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post 2',
    body: 'Body 2',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'Post 3',
    body: 'Body 3',
    published: true,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    text: '1 comment',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: '2 comment',
    author: '2',
    post: '2'
  },
  {
    id: '3',
    text: '3 comment',
    author: '2',
    post: '3'
  },
  {
    id: '4',
    text: '4 comment',
    author: '3',
    post: '1'
  }
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
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
    posts(_, args) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(_, args) {
      return comments;
    }
  },
  Post: {
    author(parent, args) {
      return users.find(user => {
        return user.id === parent.author
      });
    },
    comments(parent, args) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args) {
      return users.find(user => {
        return user.id === parent.author
      });
    },
    post(parent, args) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('App running on port 4000');
});