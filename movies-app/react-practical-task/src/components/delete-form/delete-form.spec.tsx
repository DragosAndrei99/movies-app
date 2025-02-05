import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteForm from './delete-form'; 
describe('DeleteForm Component', () => {
  const handleDelete = vi.fn();

  const renderDeleteForm = () =>
    render(
      <DeleteForm handleDelete={handleDelete} />
    );

  it('renders the delete confirmation message', () => {
    renderDeleteForm();

    expect(screen.getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();
  });

  it('calls handleDelete when the confirm button is clicked', async () => {
    renderDeleteForm();

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
