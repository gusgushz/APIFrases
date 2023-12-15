import express from "express";
import * as authorController from '../services/authorService';
import { AuthorDTO } from '../domain/dtos/Types.res_author'; 
import toNewAuthorAdded from '../utilities/authorUtilities';

const router = express.Router();

/*-----------------Admin Methods for me to work----------------------*/

router.get('/admin', (_req, res) => { 
  res.send(authorController.getAllAdmin());
});

router.get('/admin/:id', (req, res) => {
  const author = authorController.findById(req.params.id);
  return (author != null)
  ? res.send(author)
  : res.status(404).send('Ups, ese autor no está en la base de datos.');
});

router.post('/admin', (req, res) => {
  try{
    const newAuthor = toNewAuthorAdded(req.body);
    const newAuthorAdded:AuthorDTO = authorController.createAuthor(newAuthor);
    
    res.json(newAuthorAdded);
  }
  catch(e:unknown) {
    res.status(400).send('Ups, no se pudo agregar el nuevo Autor.')
  }
});

router.put('/admin/:id', (req, res) => {
  try{
    const toUpdateAuthor = toNewAuthorAdded(req.body);
    const UpdatedAuthor = authorController.updateAuthor(req.params.id,toUpdateAuthor)
    
    if (UpdatedAuthor) {
      res.status(200).json(UpdatedAuthor);
    }
  }
  catch(e:unknown) {
    res.status(400).send('Ups, no se pudo actualizar el Autor.')
  }
})

router.delete('/admin/:id', (req, res) => {
  try{
    const author = authorController.deleteAuthor(req.params.id);
    if (author != null)
    res.status(200).send('Autor eliminado exitosamente.');
  }
  catch(e:unknown) {
    res.status(400).send('Ups, no se pudo eliminar porque no se encontró ese Author.')
  }
});

/*-----------------Public Methods for the public in the APP-----------------*/

router.get('/', (_req, res) => {
  res.send(authorController.getAll());
});

router.get('/:authorname', (req, res) => {
  const authorsFound = authorController.findFullName(req.params.authorname);
  return (authorsFound != null)
  ? res.send(authorsFound)
  : res.status(404).send('Ups, ese autor no está en la base de datos.');
});

export default router;