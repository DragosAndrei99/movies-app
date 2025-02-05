import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from './dialog'; 

vi.mock('focus-trap-react', () => {
  return {
    default: ({ children } : {children : any}) => <div>{children}</div>, 
  };
});

describe('Dialog Component', () => {
  const handleClose = vi.fn();

  const renderDialog = () =>
    render(
      <Dialog title="Test Dialog Title" handleClose={handleClose}>
        {[<div>
          <p>Some content</p>
          <button>Some button</button>
        </div>]}
      </Dialog>
    );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Dialog with title and children', () => {
    renderDialog();

    expect(screen.getByText('Test Dialog Title')).toBeInTheDocument();

    expect(screen.getByText('Some content')).toBeInTheDocument();
  });

  it('calls handleClose when the close button is clicked', async () => {
    renderDialog();

    const closeButton = screen.getByRole('button', { name: /x/i });
    await userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
