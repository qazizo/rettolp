import {transformDataIntoPlotPoints} from '../transformDataIntoPlotPoints';

const mockData = [
  {
    name: 'Product',
    values: [
      '17" LCD w/built-in HDTV Tuner',
      'Mini DV Camcorder with 3.5" Swivel LCD',
      'Envoy Ambassador',
      'Model CD13272 Tricolor Ink Cartridge',
      '5MP Telephoto Digital Camera',
      '256MB Memory Card',
    ],
  },
  {
    name: 'Revenue',
    values: [
      1256523.879999999, 4303905.360000013, 14439514.229999809,
      223194.63999999984, 20004, 11063.36,
    ],
  },
  {
    name: 'Units sold',
    values: [980, 3064, 8882, 176, 16, 8],
  },
];

const transformedMockData = [
  {
    Product: '17" LCD w/built-in HDTV Tuner',
    Revenue: 1256523.879999999,
    'Units sold': 980,
  },
  {
    Product: 'Mini DV Camcorder with 3.5" Swivel LCD',
    Revenue: 4303905.360000013,
    'Units sold': 3064,
  },
  {
    Product: 'Envoy Ambassador',
    Revenue: 14439514.229999809,
    'Units sold': 8882,
  },
  {
    Product: 'Model CD13272 Tricolor Ink Cartridge',
    Revenue: 223194.63999999984,
    'Units sold': 176,
  },
  {
    Product: '5MP Telephoto Digital Camera',
    Revenue: 20004,
    'Units sold': 16,
  },
  {
    Product: '256MB Memory Card',
    Revenue: 11063.36,
    'Units sold': 8,
  },
];

describe('Test ' + transformDataIntoPlotPoints.name, () => {
  const points = transformDataIntoPlotPoints(mockData);

  test('It returns an array of objects', () => {
    expect(Array.isArray(points)).toBe(true);
    expect(typeof points[0]).toBe('object');
  });

  test('It transform input data into points correctly', () => {
    expect(points).toEqual(transformedMockData);
  });
});
