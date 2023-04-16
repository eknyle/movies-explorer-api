const { JWT_SECRET_DEV = 'be8b84dd26d63073b10fb6a7915ece4fdab5a6d77fb2892f4266b4daf5358d41' } = process.env;
const { DB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { PORT_DEV = 3001 } = process.env;

module.exports = {
  PORT_DEV, JWT_SECRET_DEV, DB_ADRESS,
};
