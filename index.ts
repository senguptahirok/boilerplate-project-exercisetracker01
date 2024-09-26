import { Request, Response } from 'express';
import { initDb } from './src/initDb';
import { insertExampleUserAndExercise } from './src/testQuery';

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/test', async () => {
  const db = await initDb();
  await insertExampleUserAndExercise(db, Date.now().toString());
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
