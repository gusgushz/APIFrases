import { Author } from '../domain/models/Types.author';
import { AuthorDTO } from '../domain/dtos/Types.res_author';
import authorData from './authorsData.json';

const authors: Array<Author> = authorData as Array<Author>

export const getAll = () => {
  return authors.map(({name, last_name, url_image, country}) =>{
    return {
      name, 
      last_name,
      url_image,
      country
    }
  })
};

export const findByName = (name: string): AuthorDTO | undefined => {
  const author = authors.find(a => a.name == name)
  if (author != null){
    const {id, ...authorDTO} = author;
    return authorDTO;
  }
  return author;
}

export const createAuthor = () => null;