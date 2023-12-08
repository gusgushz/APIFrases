import express from "express";
import * as authorController from '../controllers/authorController';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(authorController.getAll());
});

router.get('/:name', (req, res) => {
  const author = authorController.findByName(req.params.name);
  return (author != null)
  ? res.send(author)
  : res.status(404).send('Ups, ese autor no está en la base de datos.');;
});

router.post('/', (_req, res) => {
  res.send('Creating a new author')
});

export default router;