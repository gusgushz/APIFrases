import express from "express";
import * as authorController from '../services/authorService';
import { AuthorDTO } from '../domain/dtos/Types.res_author'; 
import toNewAuthorAdded from '../utilities/authorUtilities';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(authorController.getAll());
});

router.get('/:name', (req, res) => {
  const author = authorController.findByName(req.params.name);
  return (author != null)
  ? res.send(author)
  : res.status(404).send('Ups, ese autor no está en la base de datos.');
});

router.post('/', (req, res) => {
  try{
    const newAuthor = toNewAuthorAdded(req.body);
    const newAuthorAdded:AuthorDTO = authorController.createAuthor(newAuthor);
    
    res.json(newAuthorAdded);
  }
  catch(e:unknown) {
    res.status(400).send('Ups, no se pudo agregar el nuevo Autor.')
  }
  

  
});

export default router;