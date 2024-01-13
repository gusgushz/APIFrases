import express from "express";
import * as authorController from '../services/authorService';
import toValidatedAuthor  from '../utilities/authorUtilities';

const router = express.Router();

/*-----------------Admin Methods for me to work----------------------*/

router.get('/admin', async (_req, res) => { 
  try {
    const authors = await authorController.getAllAdmin();
    res.json(authors);
  } catch (error:any) {
    console.error(`Error recuperando autores: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/admin/:id', async (req, res) => {
  try {
    const authors = await authorController.findById(req.params.id);
    res.json(authors);
  } catch (error:any) {
    console.error(`Error recuperando autor: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/admin', async (req, res) => {
  try{
    const newAuthor = toValidatedAuthor (req.body);
    const newAuthorAdded = await authorController.createAuthor(newAuthor);
    
    res.json(newAuthorAdded);
  }
  catch(error:any) {
    console.error(`Error agregando autor: ${error.message}`);
    res.status(500).send('Ups, error del servidor, no se pudo agregar el nuevo Autor.')
  }
});

router.put('/admin/:id', async (req, res) => {
  try{
    const toUpdateAuthor = toValidatedAuthor (req.body);
    const updatedAuthor = await authorController.updateAuthor(req.params.id,toUpdateAuthor);

    if (updatedAuthor) {
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).send('Autor no encontrado');
    }
  }
  catch(error:any) {
    console.error(`Error editando autor: ${error.message}`);
    res.status(500).send('Ups, error del servidor, no se pudo editar el nuevo Autor.');
  }
});

router.delete('/admin/:id', async (req, res) => {
  try{
    const author = await authorController.deleteAuthor(req.params.id);
    if (author != null) {
    res.status(200).send('Autor eliminado exitosamente.');
    } else {
      res.status(404).send('Autor no encontrado.');
    }
  }
  catch(error:any) {
    res.status(500).send('Ups, error del servidor, no se pudo eliminar porque no se encontró ese Autor.')
  }
});

/*-----------------Public Methods for the public in the APP-----------------*/

router.get('/', async (_req, res) => {
  try {
    res.send(await authorController.getAll());
  } catch (error:any) {
    console.error(`Error recuperando autores: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/:authorname', async (req, res) => {
  try {
    const authorsFound = await authorController.findFullName(req.params.authorname);
    if (Array.isArray(authorsFound) && authorsFound.length > 0) {
      res.send(authorsFound)
    } else {
      res.status(404).send('Ups, ese autor no está en la base de datos.');
    }
  } catch (error:any) {
    console.error(`Error recuperando autores: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

export default router;