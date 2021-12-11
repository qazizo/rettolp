import {render, screen} from '@testing-library/react';
import {Column} from '../../api/columns';
import ColumnsList from '.';

const mockColumns: Column[] = [
  {name: 'Product', function: 'dimension'},
  {name: 'Year', function: 'dimension'},
  {name: 'Country', function: 'dimension'},
  {name: 'Cost', function: 'measure'},
  {name: 'Revenue', function: 'measure'},
  {name: 'Units sold', function: 'measure'},
];

const mockUsedColumns = ['Year'];

describe(`Test ${ColumnsList.name} component`, () => {
  test('Renders list item "Units sold"', () => {
    render(<ColumnsList columns={mockColumns} />);
    const li = screen.getByText(/Units sold/);
    expect(li).toBeInTheDocument();
  });

  test('Used column "Year" is not draggable', () => {
    render(<ColumnsList columns={mockColumns} usedColumns={mockUsedColumns} />);
    const li = screen.getByText(/Year/);
    expect(li.draggable).toBe(false);
  });

  test('Unused column "Product" is draggable', () => {
    render(<ColumnsList columns={mockColumns} usedColumns={mockUsedColumns} />);
    const li = screen.getByText(/Product/);
    expect(li.draggable).toBe(true);
  });
});
