import {Data} from '../api/data';

/**
 * Transforms the data fetched from the API into an array of points
 * that can be used as a data source for the chart.
 * @param data fetched API data
 * @returns array of objects
 */
export function transformDataIntoPlotPoints(data: Data) {
  return data[0].values.map((_, index) =>
    data.reduce<Record<string, string | number>>((point, element) => {
      point[element.name] = element.values[index];
      return point;
    }, {})
  );
}
