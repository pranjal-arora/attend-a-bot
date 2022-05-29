//nodejs server  -- vanilla javascript
require('dotenv').config();

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

var env = process.env.NODE_ENV || 'development';

const server = new ApolloServer({
  cors: {
    origin: env=="development"? ['http://localhost:3000'] : ['https://Attend-a-bot.netlify.app'],
    credentials: true
  },
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.set('useCreateIndex', true);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err.message);
  });
  
  mongoose.set('useFindAndModify', false);
