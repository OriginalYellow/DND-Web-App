const { ApolloServer } = require('apollo-server');
// const { importSchema } = require('graphql-import');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const filePath = path.join(__dirname, 'typeDefs.graphql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

const { AuthenticationDirective, AuthorizationDirective } = require('./security');

// MIKE: there is an issue with this package where extended types wheren't being
// imported (they are missing from imported string). see
// https://github.com/prisma/graphql-import/issues/203 :

// const typeDefs = importSchema('typeDefs.graphql');

const resolvers = require('./resolvers');
const mocks = require('./mocks');
const {
  UserAPI,
  RulesAPI,
} = require('./datasources');

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
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      console.warn(`Unable to authenticate using auth token: ${token}`);
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
  // NOTE: you must initialize datasources inside of a function like this
  // because they are meant to be initialzed for every request
  dataSources: () => ({
    userAPI: new UserAPI(),
    rulesAPI: new RulesAPI(),
  }),
  schemaDirectives: {
    authen: AuthenticationDirective,
    autho: AuthorizationDirective,
  },
  debug: true,
  mocks,
  mockEntireSchema: false,

  // NOTE: this option only changes the chache used for datasources extending
  // apollo's RESTDataSource class (see
  // https://stackoverflow.com/questions/53358443/apollo-server-confusion-about-cache-datasource-options)

  // cache: redis or somesuch

  // NOTE: include this option with a logging function to log responses back to the
  // client

  // formatResponse: (response) => {
  //   console.log(response);
  //   return response;
  // },
});

server.listen({ port: process.env.LOCAL_PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
