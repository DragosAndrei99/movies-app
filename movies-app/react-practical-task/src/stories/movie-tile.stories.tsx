import type { Meta, StoryObj } from '@storybook/react';

import MovieTile from '../components/movie-tile/movie-tile';
import { MovieInfo } from '../interfaces/movie-info.interface';

const movieInfo: MovieInfo = {
  "id": 337167,
  "title": "Fifty Shades Freed",
  "tagline": "Don't miss the climax",
  "vote_average": 6.1,
  "vote_count": 1195,
  "release_date": "2018-02-07",
  "poster_path": "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
  "overview": "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
  "budget": 55000000,
  "revenue": 136906000,
  "genres": [
      "Drama",
      "Romance"
  ],
  "runtime": 106
}

function onClickMovieCallback() {
  console.log('clicked');
}

const meta = {
  component: MovieTile,
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {movieInfo: movieInfo, onClickCallback: onClickMovieCallback, containerWidth: "max-w-xs"}};