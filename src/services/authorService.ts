import { Author } from '../domain/models/Types.author';
import { AuthorDTO } from '../domain/dtos/Types.res_author';
import authorData from '../infrastructure/authorsData.json';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '../infrastructure/authorsData.json');

const authors: Array<Author> = authorData as Array<Author>

/*-----------------Admin Methods for me to work----------------------*/

export const getAllAdmin = () => {
  return authors.map(({id, name, last_name, url_image, country}) => {
    return {
      id,
      name, 
      last_name,
      url_image,
      country
    }
  })
};

export const findById = (id: string): Author | undefined => {
  const author = authors.find(a => a.id === parseInt(id))
  if (author != null){
    return author;
  }
  return author;
}

export const createAuthor = (newAuthorDTO: AuthorDTO): Author => {
  const newAuthor = {
    id: Math.max( ...authors.map(a => a.id)) + 1,
    ... newAuthorDTO
  }
  authors.push(newAuthor);

  fs.writeFileSync(dataFilePath,JSON.stringify(authors, null, 2))

  return newAuthor;
};

export const updateAuthor = (id:string, author: AuthorDTO): Author | undefined => {
  const toUpdateAuthor = authors.find(a => a.id === parseInt(id))
  if (toUpdateAuthor != null) {
    toUpdateAuthor.name = author.name;
    toUpdateAuthor.last_name = author.last_name;
    toUpdateAuthor.url_image = author.url_image;
    toUpdateAuthor.country = author.country;

    fs.writeFileSync(dataFilePath, JSON.stringify(authors, null, 2));

    return toUpdateAuthor;
  } else {
    return undefined;
  }
}

export const deleteAuthor = (id: string): Author | undefined => {
  const index = authors.findIndex(author => author.id == parseInt(id));
  if (index !== -1) {
    const deletedAuthor = authors.splice(index, 1)[0];
    return deletedAuthor;
  }
  return undefined;
}

/*-----------------Public Methods for the public in the APP-----------------*/

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

export const findFullName = (authorName: string): AuthorDTO[] | undefined => {
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
  }
};