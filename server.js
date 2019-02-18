const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');
const mocks = require('./mocks');
const UserAPI = require('./datasources/user');

require('dotenv').config({ path: '.env' });
// const User = require('./models/User');
// const PlayerCharacter = require('./models/PlayerCharacter');

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// eslint-disable-next-line consistent-return
const getUserInfoFromToken = async (token) => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        'Your session has ended. Please sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    // return { User, PlayerCharacter, currentUserInfo: await getUserInfoFromToken(token) };
    return { currentUserInfo: await getUserInfoFromToken(token) };
  },
  dataSources: () => ({ userAPI: new UserAPI() }),
  // MIKE: this should turn off the stacktrace - u want to set this in production
  // debug: false,
  mocks,
  mockEntireSchema: false,
});

server.listen({ port: process.env.LOCAL_PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
