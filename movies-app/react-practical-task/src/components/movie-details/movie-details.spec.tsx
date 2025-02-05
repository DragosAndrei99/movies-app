import { render, screen } from '@testing-library/react';
import MovieDetails from './movie-details';
import { MovieInfo } from '../../interfaces/movie-info.interface';

const mockMovie: MovieInfo = {
  id: 337167,
  tagline: "Don't miss the climax",
  poster_path: 'https://example.com/movie-poster.jpg',
  title: 'Example Movie',
  genres: [
    "Drama",
    "Romance"
  ],
  release_date: "2018-02-07",
  runtime: 106,
  vote_count: 1195,
  vote_average: 8.5,
  overview: 'An exciting action movie filled with adventure and suspense.',
  budget: 55000000,
  revenue: 136906000,
};

describe('MovieDetails Component', () => {
  it('renders the movie name', () => {
    render(<MovieDetails movieInfo={mockMovie} />);
    const movieNameElement = screen.getByText('Example Movie');
    expect(movieNameElement).toBeInTheDocument();
  });

  it('renders the genre', () => {
    render(<MovieDetails movieInfo={mockMovie} />);
    const genreElement = screen.getByText('Drama, Romance');
    expect(genreElement).toBeInTheDocument();
  });

  it('renders the release year and duration', () => {
    render(<MovieDetails movieInfo={mockMovie} />);
    const releaseYearElement = screen.getByText('2018-02-07');
    const durationElement = screen.getByText('106');
    expect(releaseYearElement).toBeInTheDocument();
    expect(durationElement).toBeInTheDocument();
  });

  it('renders the movie rating', () => {
    render(<MovieDetails movieInfo={mockMovie} />);
    const ratingElement = screen.getByText('8.5');
    expect(ratingElement).toBeInTheDocument();
  });

  it('renders the movie description', () => {
    render(<MovieDetails movieInfo={mockMovie} />);
    const descriptionElement = screen.getByText(/An exciting action movie filled with adventure and suspense./i);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the movie poster image with correct alt text', () => {
    render(<MovieDetails movieInfo={mockMovie} />);
    const imageElement = screen.getByAltText('Example Movie Poster');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockMovie.poster_path);
  });
});