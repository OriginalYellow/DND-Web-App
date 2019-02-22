// MIKE: eventually turn this into a package so you can reuse it in client and server

const strings = require('./strings');
const mongo = require('./mongo');

module.exports = {
  ...strings,
  ...mongo,
};
