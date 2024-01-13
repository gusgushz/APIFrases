import database from '../../databaseService';
import { Phrase } from '../domain/models/Types.phrase';

/*-----------------All methods are Admin, because i will be only one adding the phrases----------------------*/

export const getAllPhrasesFromOneAuthor = async (idAuthor:string): Promise<Phrase[] | undefined> => {
  try {
    const phrases = await database('phrases')
      .select('phrases.id', 'phrases.author_id', 'phrases.content', 'authors.name as authorName', 'authors.last_name as authorLastName')
      .where('phrases.author_id', parseInt(idAuthor))
      .innerJoin('authors', 'phrases.author_id', 'authors.id');

    return phrases.map(({ id, author_id, authorName, authorLastName, content }) => ({
      id,
      author_id,
      authorName,
      authorLastName,
      content,
    }));
  } catch (error:any) {
    throw new Error(`Error buscando frases: ${error.message}`);
  }
};

export const createPhrase = async (newPhraseReq: object): Promise<Phrase> => {
  try {
    const newPhrase:Phrase = await database('phrases')
      .returning(['id', 'author_id', 'content'])
      .insert(newPhraseReq);
    
    return newPhrase;
  } catch (error:any) {
    throw new Error(`Error agregando al autor en la base de datos`);
  }
};

export const updatePhrase = async (body: any): Promise<Phrase | undefined> => {
  try {
    const toUpdatePhrase:Phrase = await database('phrases')
    .select('phrases.id', 'phrases.author_id', 'phrases.content', 'authors.name as authorName', 'authors.last_name as authorLastName')
    .where({
      'phrases.id': body.id,
      'phrases.author_id': body.author_id
    })
    .innerJoin('authors', 'phrases.author_id', 'authors.id')
    .first();

    if (toUpdatePhrase != null) {
      toUpdatePhrase.content = body.content;

      await database('phrases').where({
        'id': toUpdatePhrase.id,
        'author_id': toUpdatePhrase.author_id
      }).update({
        content: toUpdatePhrase.content
      });

      return toUpdatePhrase;
    } else {
      return undefined;
    }
  } catch (error:any) {
    throw new Error(`Error actualizando la frase en la base de datos`);
  }
};

export const deletePhrase = async (body: any): Promise<Phrase | undefined> => {
  try {
    const toDeletePhrase:Phrase = await database('phrases')
    .select('phrases.id', 'phrases.author_id')
    .where({
      'phrases.id': body.id,
      'phrases.author_id': body.author_id
    })
    .first();
    if (toDeletePhrase) {
      await database('phrases')
      .where({
        'id': parseInt(body.id),
        'author_id': parseInt(body.author_id)
      }).
      delete();
      
      return toDeletePhrase;
    }
    return undefined;
  } catch (error:any) {
    throw new Error(`Error eliminando la frase en la base de datos`);
  }
};