import {render, screen} from '@testing-library/react';
import ColumnInput from '.';

describe(`Test ${ColumnInput.name} component`, () => {
  test('Renders "Clear" button when input has elements', () => {
    render(
      <ColumnInput
        type="dimension"
        value="Year"
        onAdd={() => {}}
        onClear={() => {}}
      />
    );
    const button = screen.getByText(/Clear/);
    expect(button).toBeInTheDocument();
  });
});
