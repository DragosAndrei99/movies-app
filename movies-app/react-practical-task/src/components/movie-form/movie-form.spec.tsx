import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MovieForm from './movie-form';
import { MovieInfo } from '../../interfaces/movie-info.interface';

describe('MovieForm Component', () => {
  const handleFormSubmit = vi.fn();
  const movieInfo: MovieInfo = {
    "id": 337167,
    "title": "Fifty Shades Freed",
    "tagline": "Don't miss the climax",
    "vote_average": 6.1,
    "vote_count": 1195,
    "release_date": "2018-02-07",
    "poster_path": "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
    "overview": "A mind-bending thriller.",
    "budget": 55000000,
    "revenue": 136906000,
    "genres": [
        "Drama",
        "Romance"
    ],
    "runtime": 106
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderMovieFormWithoutMovieValues = () =>
    render(<MovieForm handleFormSubmit={handleFormSubmit} />);

  const renderMovieFormWithMovieValues = () =>
    render(<MovieForm handleFormSubmit={handleFormSubmit} initialMovie={movieInfo} />);

  it('renders the MovieForm without given initial values', () => {
    renderMovieFormWithoutMovieValues();

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/movie url/i)).toHaveValue('');
    expect(screen.getByLabelText(/genre/i)).toHaveValue('');
    expect(screen.getByLabelText(/release date/i)).toHaveValue('');
    expect(screen.getByLabelText(/rating/i)).toHaveValue(null);
    expect(screen.getByLabelText(/runtime/i)).toHaveValue(null);
    expect(screen.getByLabelText(/overview/i)).toHaveValue('');
  })

  it('renders the MovieForm with given initial values', () => {
    renderMovieFormWithMovieValues();

    expect(screen.getByLabelText(/title/i)).toHaveValue('Fifty Shades Freed');
    expect(screen.getByLabelText(/movie url/i)).toHaveValue('https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg');
    expect(screen.getByLabelText(/genre/i)).toHaveValue('Drama');
    expect(screen.getByLabelText(/release date/i)).toHaveValue('2018-02-07');
    expect(screen.getByLabelText(/rating/i)).toHaveValue(6.1);
    expect(screen.getByLabelText(/runtime/i)).toHaveValue(106);
    expect(screen.getByLabelText(/overview/i)).toHaveValue('A mind-bending thriller.');
  });

  it('captures user input correctly', async () => {
    renderMovieFormWithMovieValues();
    const user = userEvent.setup();

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, 'Interstellar');

    const genreSelect = screen.getByLabelText(/genre/i);
    await user.selectOptions(genreSelect, 'Adventure');

    expect(titleInput).toHaveValue('Interstellar');
    expect(genreSelect).toHaveValue('Adventure');
  });

  it('calls handleFormSubmit when the form is submitted', async () => {
    renderMovieFormWithMovieValues();
    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });
});
