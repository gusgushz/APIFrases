export enum Country {
  Japon = 'Japón',
  ReinoUnido = 'Reino Unido',
  Inglaterra = 'Inglaterra',
  España = 'España',
  Italia = 'Italia',
  Mexico = 'México',
  Rusia = 'Rusia'
}

export interface Author {
  id: number,
  name: string,
  last_name: string,
  url_image: string,
  country: Country
};