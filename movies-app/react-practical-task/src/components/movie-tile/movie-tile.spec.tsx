import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MovieTile from './movie-tile';
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

describe('MovieTile Component', () => {
  const mockOnClickCallback = vi.fn();

  it('renders movie information correctly', () => {
    render(<MovieTile movieInfo={mockMovie} onClickCallback={mockOnClickCallback} containerWidth='max-w-xs'/>);
    
    expect(screen.getByText('Example Movie')).toBeInTheDocument();
    expect(screen.getByText('2018-02-07')).toBeInTheDocument();
    expect(screen.getByText('Drama, Romance')).toBeInTheDocument();
    
    const image = screen.getByAltText('Example Movie Poster');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockMovie.poster_path);
  });

  it('calls onClickCallback when the tile is clicked', () => {
    render(<MovieTile movieInfo={mockMovie} onClickCallback={mockOnClickCallback} containerWidth='max-w-xs'/>);
    
    fireEvent.click(screen.getByText('Example Movie'));
    
    expect(mockOnClickCallback).toHaveBeenCalled();
  });

  it('toggles the menu when the button is clicked', () => {
    render(<MovieTile movieInfo={mockMovie} onClickCallback={mockOnClickCallback} containerWidth='max-w-xs'/>);
    
    const button = screen.getByRole('button');
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    
    fireEvent.click(button);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});
