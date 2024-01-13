import express from 'express';
import authorRouter from './routes_controllers/authorsRoute';
import phraseRouter from './routes_controllers/phraseRoute';

const app = express();
app.use(express.json()); //middleware que transforma la req.body a un json

const PORT = 3000;

app.get('/ping', (_req, res) =>{
  console.log('it`s a ping')
  res.send('pong')
});

app.use('/api/authors', authorRouter);
app.use('/api/phrases', phraseRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});