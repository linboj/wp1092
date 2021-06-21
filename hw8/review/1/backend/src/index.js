import { GraphQLServer, PubSub } from 'graphql-yoga';
import  mongo from './mongo.js'
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import {chatBoxModel,messageModel,userModel} from './model.js'
import dotenv from 'dotenv-defaults'

dotenv.config()

const db = {
    userModel,
    chatBoxModel,
    messageModel,
}

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect()

server.start({ port: process.env.PORT | 8080 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 8080}!`);
});
