const isString = (string: string): boolean => {
  return typeof string === 'string';
};

const validContent = (contentFromRequest: any): string => {
  if(!isString(contentFromRequest)) {
    throw new Error('Contenido de la frase no valida');
  }
  return contentFromRequest;
};

const parsedAuthorId = (idAuthorFromRequest: any): number => {
  if (isNaN(idAuthorFromRequest) || idAuthorFromRequest <= 0) {
    throw new Error('Id del autor no valido');
  }
  return idAuthorFromRequest;
}

const parsedPhraseId = (idPhraseFromRequest: any): number => {
  if (isNaN(idPhraseFromRequest) || idPhraseFromRequest <= 0) {
    throw new Error('Id de la frase no valido');
  }
  return idPhraseFromRequest;
}

export const toValidatedPhrase  = (body: any): object => {
  const newPhrase = {
    author_id: parsedAuthorId(body.author_id),
    content: validContent(body.content)
  };
  return newPhrase;
};

export const toUpdatedPhrase  = (body: any): object => {
  const updatePhrase = {
    id: parsedPhraseId(body.id),
    author_id: parsedAuthorId(body.author_id),
    content: validContent(body.content)
  };
  return updatePhrase;
};