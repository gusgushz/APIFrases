import { Author } from "../models/Types.author";

export type AuthorDTO = Omit<Author, 'id'>