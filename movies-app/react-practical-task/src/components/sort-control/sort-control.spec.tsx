import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SortControl from './sort-control';

describe('SortControl Component', () => {
  const mockHandleSelectionChange = vi.fn(); 

  it('renders correctly with the current selection', () => {
    render(<SortControl currentSelection="Release Date" handleSelectionChange={mockHandleSelectionChange} />);
    const sortByText = screen.getByText('Sort By');
    const selectElement = screen.getByDisplayValue('Release Date');

    expect(sortByText).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
  });

  it('displays the correct options in the select element', () => {
    render(<SortControl currentSelection="Release Date" handleSelectionChange={mockHandleSelectionChange} />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);

    expect(options[0]).toHaveTextContent('Release Date');
    expect(options[1]).toHaveTextContent('Title');
  });

  it('calls handleSelectionChange with the correct value when a new option is selected', () => {
    render(<SortControl currentSelection="Release Date" handleSelectionChange={mockHandleSelectionChange} />);
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Title' } });

    expect(mockHandleSelectionChange).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectionChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
