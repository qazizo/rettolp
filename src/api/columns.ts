import API_URL from './_url';

export type Column = {name: string; function: 'dimension' | 'measure'};

export async function fetchColumns() {
  const response = await fetch(API_URL + '/columns');
  const data = await response.json();
  return data as Column[];
}
