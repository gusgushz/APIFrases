export type Country = 'Japón' | 'Reino Unido' | 'Inglaterra' | 'España' | 'Italia';

export interface Author {
  id: number,
  name: string,
  last_name: string,
  url_image: string,
  country: Country
};