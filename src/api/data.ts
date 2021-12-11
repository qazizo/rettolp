import API_URL from './_url';

export type Data = {name: string; values: (string | number)[]}[];

export async function fetchData(dimension: string, measures: string[]) {
  const response = await fetch(API_URL + '/data', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({dimension, measures}),
  });
  const data = await response.json();
  return data as Data;
}
