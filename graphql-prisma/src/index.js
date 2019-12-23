import { GraphQLServer } from 'graphql-yoga';

import prisma from './prisma';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context(request) {
    return {
      prisma,
      request
    };
  }
});

server.start(() => {
  console.log('App running on port 4000');
});