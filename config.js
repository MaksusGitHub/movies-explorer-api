require('dotenv').config();

const {
  PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  DB,
};
