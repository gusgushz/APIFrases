import { Author } from '../domain/models/Types.author';
import { AuthorDTO } from '../domain/dtos/Types.res_author';
import authorData from '../infrastructure/authorsData.json';
import database from '../../databaseService';

const authors: Array<Author> = authorData as Array<Author>

/*-----------------Admin Methods for me to work----------------------*/

export const getAllAdmin = async () => {
  try{
    const authors = await database('authors').select('*');
    return authors.map(({id, name, last_name, url_image, country}) => ({
      id,
      name,
      last_name,
      url_image,
      country,
    }));
  } catch (error: any) {
    throw new Error(`Error buscando autores: ${error.message}`);
  }
};

export const findById = async (id: string): Promise<Author | undefined> => {
  try {
    const author:Author | undefined = await database('authors').where('id',parseInt(id)).first();
    return author;
  } catch (error:any) {
    throw new Error(`Error buscando autor con el id: ${id} en la base de datos`);
  }
};

export const createAuthor = async (newAuthorDTO: AuthorDTO): Promise<Author> => {
  try {
    const maxIdResult = await database('authors').max('id as maxId').first();
    const maxId = maxIdResult?.maxId || 0;

    const newId = maxId + 1;

    const newAuthor = {
      id: newId,
      ...newAuthorDTO,
    };

    await database('authors').insert(newAuthor);
    
    return newAuthor;
  } catch (error:any) {
    throw new Error(`Error agregando al autor en la base de datos`);
  }
};

export const updateAuthor = async (id:string, author: AuthorDTO): Promise<Author | undefined> => {
  try {
    const toUpdateAuthor:Author | undefined = await database('authors').where('id',parseInt(id)).first();
    if (toUpdateAuthor != null) {
      toUpdateAuthor.name = author.name;
      toUpdateAuthor.last_name = author.last_name;
      toUpdateAuthor.url_image = author.url_image;
      toUpdateAuthor.country = author.country;

      await database('authors').where('id', parseInt(id)).update({
        name: author.name,
        last_name: author.last_name,
        url_image: author.url_image,
        country: author.country,
      });

      return toUpdateAuthor;
    } else {
      return undefined;
    }
  } catch (error:any) {
    throw new Error(`Error agregando al autor en la base de datos`);
  }
};

export const deleteAuthor = async (id: string): Promise<Author | undefined> => {
  try {
    const toDeleteAuthor:Author = await database('authors').where('id',parseInt(id)).first();
    if (toDeleteAuthor) {
      await database('authors').where('id', parseInt(id)).delete();
      
      return toDeleteAuthor;
    }
    return undefined;
  } catch (error:any) {
    throw new Error(`Error eliminando al autor en la base de datos`);
  }
};

/*-----------------Public Methods for the public in the APP-----------------*/

export const getAll = async () => {
  try {
    const authors = await database('authors').select('*');
    return authors.map(({name, last_name, url_image, country}) => {
      return {
        name, 
        last_name,
        url_image,
        country
      }
    })
  } catch (error: any) {
    throw new Error(`Error buscando autores: ${error.message}`);
  }
};
//Lo voy a dejar pero no se si a futuro me sirva
export const findByName = (name: string): Author[] | undefined => {
  const similarAuthors = authors.filter(a => 
    a.name.toLowerCase().includes(name.toLowerCase()));
  if (similarAuthors.length > 0) {
    return similarAuthors.map(({...authorDTO }) => authorDTO);
  } else {
    return undefined;
  }
};
//Lo voy a dejar per no se si a futuro me sirva
export const findByLastName = (last_name: string): Author[] | undefined => {
  const similarAuthors = authors.filter(a =>  
    a.last_name.toLowerCase().includes(last_name.toLowerCase()));
  if (similarAuthors.length > 0) {
    return similarAuthors.map(({...authorDTO }) => authorDTO);
  } else {
    return undefined;
  }
};

export const findFullName = async (authorName: string): Promise<AuthorDTO[] | undefined> => {
  try {
    const similarAuthors = await database('authors')
    .where('name', 'like', `%${authorName}%`)
    .orWhere('last_name', 'like', `%${authorName}%`);

    if (similarAuthors.length > 0) {
      return similarAuthors.map(({name, last_name, url_image, country}) =>{
        return {
          name, 
          last_name,
          url_image,
          country
        }
      })
    } else {
      return undefined;
    }
  } catch (error:any) {
    throw new Error(`Error buscando autores: ${error.message}`);
  }
  /*
  const similarAuthors = authors.filter(a =>  
    a.name.toLowerCase().includes(authorName.toLowerCase()) ||
    a.last_name.toLowerCase().includes(authorName.toLowerCase()));
  if (similarAuthors.length > 0) {
    return similarAuthors.map(({name, last_name, url_image, country}) =>{
      return {
        name, 
        last_name,
        url_image,
        country
      }
    })
  } else {
    return undefined;
  }*/
};