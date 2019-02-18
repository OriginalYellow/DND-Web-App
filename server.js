const { ApolloServer, AuthenticationError } = require('apollo-server');
const { importSchema } = require('graphql-import');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

const { AuthenticationDirective, AuthorizationDirective } = require('./security');

// MIKE: there is an issue with this package where extended types wheren't being
// imported (they are missing from imported string). see
// https://github.com/prisma/graphql-import/issues/203 const typeDefs =

// importSchema('typeDefs.graphql');

const resolvers = require('./resolvers');
const mocks = require('./mocks');
const UserAPI = require('./datasources/user');

require('dotenv').config({ path: '.env' });

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
    } catch (error) {
      console.warn(`Unable to authenticate using auth token: ${token}`);
      // throw new AuthenticationError(
      //   'Your session has ended. Please sign in again.',
      // );
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    return { currentUserInfo: await getUserInfoFromToken(token) };
  },
  dataSources: () => ({ userAPI: new UserAPI() }),
  schemaDirectives: {
    authen: AuthenticationDirective,
    autho: AuthorizationDirective,
  },
  // MIKE: this should turn off the stacktrace - u want to set this in production
  debug: false,
  mocks,
  mockEntireSchema: false,
});

server.listen({ port: process.env.LOCAL_PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
