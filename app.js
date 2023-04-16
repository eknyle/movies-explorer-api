require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const errorHandler = require('./errors/error-handler');
const routes = require('./routes');
const { DB_ADRESS, PORT_DEV } = require('./config');

const port = process.env.NODE_ENV !== 'production' ? PORT_DEV : process.env.PORT;
const DB = process.env.NODE_ENV !== 'production' ? DB_ADRESS : process.env.DB_ADRESS;

const app = express();
app.use(cors());

mongoose
  .connect(DB)
  .then(console.log(`Connected to the server ${DB}`))
  .catch((err) => console.log(err));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(port, () => { console.log(`now listening  on http://localhost:${port}/`); });
