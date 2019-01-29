const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

require('dotenv').config({ path: '.env' });
const User = require('./models/User');

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ User }),
});

server.listen({ port: process.env.LOCAL_PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
