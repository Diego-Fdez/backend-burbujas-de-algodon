import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

//importando database conecction
import { sequelize } from './db/database.js';
import './models/form.models.js'

//Iniciando conecction 
try {
  await sequelize.sync({force: true});
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
/* Creating an instance of the express application. */
const app = express();
app.use(express.json());


dotenv.config();

const PORT = process.env.PORT || 5000;

/* A middleware that logs all requests to the console. */
app.use(morgan('dev'));

//cors configuration
const whitelist = [process.env.FRONTEND_URL];

/* A function that checks if the origin is in the whitelist. */
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Cors error'));
    }
  },
};

/* A middleware that enables cors. */
//app.use(cors(corsOptions));

//app.use('/api/v1');

/* Telling the server to listen on port ?. */
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
