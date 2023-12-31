import { AuthorDTO } from '../domain/dtos/Types.res_author';
import { Country } from '../domain/models/Types.author';

const isString = (string: string): boolean => {
  return typeof string === 'string';
};

const validName = (nameFromRequest: any): string => {
  if(!isString(nameFromRequest)) {
    throw new Error('Nombre no valido');
  }
  return nameFromRequest;
};

const validLastName = (lastNameFromRequest: any): string => {
  if(!isString(lastNameFromRequest)) {
    throw new Error('Apellido no valido');
  }
  return lastNameFromRequest;
};

const validUrlImage = (urlImageFromRequest: any): string => {
  if(!isString(urlImageFromRequest)) {
    throw new Error('URL no valida');
  }
  return urlImageFromRequest;
};

const isCountry = (param: any): boolean => {
  return Object.values(Country).includes(param);
}

const validCountry = (countryFromRequest: any): Country => {
  if(!isString(countryFromRequest) || !isCountry(countryFromRequest)) {
    throw new Error('País no valido');
  } 
  return countryFromRequest; 
};

export const toValidatedAuthor  = (body: any):AuthorDTO => {
  const newAuthor:AuthorDTO = {
    name: validName(body.name),
    last_name: validLastName(body.last_name),
    url_image: validUrlImage(body.url_image),
    country: validCountry(body.country)
  };
  return newAuthor;
};

export default toValidatedAuthor;  