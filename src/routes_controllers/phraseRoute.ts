import express from "express";
import * as phraseController from '../services/phraseService';
import {toValidatedPhrase, toUpdatedPhrase } from "../utilities/phraseUtilities";

const router = express.Router();

/*-----------------All methods are Admin, because i will be only one adding the phrases----------------------*/

router.get('/', async (_req, res) => {
  console.log('Frases');
  res.send('Escribe "/:idAuthor" en el buscador para ver las frases de algún autor.');
});

router.get('/:idAuthor', async (req, res) => {
  try {
    const phrases = await phraseController.getAllPhrasesFromOneAuthor(req.params.idAuthor);
    res.json(phrases);
  } catch (error:any) {
    console.error(`Error recuperando frases: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/', async (req, res) => {
  try{
    const newPhrase = toValidatedPhrase(req.body);
    const newPhraseValidaded = await phraseController.createPhrase(newPhrase);
    
    res.json(newPhraseValidaded);
  }
  catch(error:any) {
    console.error(`Error agregando autor: ${error.message}`);
    res.status(500).send('Ups, error del servidor, no se pudo agregar el nuevo Autor.')
  }
});

router.put('/', async (req, res) => {
  try{
    const toUpdatePhrase = toUpdatedPhrase(req.body);
    const updatedPhrase = await phraseController.updatePhrase(toUpdatePhrase);

    if (updatedPhrase) {
      res.status(200).json(updatedPhrase);
    } else {
      res.status(404).send('Frase no encontrada');
    }
  }
  catch(error:any) {
    console.error(`Error editando la frase: ${error.message}`);
    res.status(500).send('Ups, error del servidor, no se pudo editar la frase.');
  }
});

router.delete('/', async (req, res) => {
  try{
    const phrase = await phraseController.deletePhrase(req.body);
    if (phrase != null) {
    res.status(200).send('Autor eliminado exitosamente.');
    } else {
      res.status(404).send('Autor no encontrado.');
    }
  }
  catch(error:any) {
    res.status(500).send('Ups, error del servidor, no se pudo eliminar porque no se encontró esa frase.')
  }
});

export default router;