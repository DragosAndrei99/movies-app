import type { Meta, StoryObj } from '@storybook/react';

import Dialog from '../components/dialog/dialog';
import MovieForm from '../components/movie-form/movie-form';
import { MovieInfo } from '../interfaces/movie-info.interface';
import { FormEvent } from 'react';
import DeleteForm from '../components/delete-form/delete-form';

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

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
  e?.preventDefault();
  console.log(Object.fromEntries(new FormData(e.currentTarget)))
}

export const AddMovie: Story = {
  args: {
    title: 'Add Movie',
    children: [<MovieForm handleFormSubmit={handleFormSubmit} />],
    handleClose: () => {}
  }
};

export const EditMovie: Story = {
  args: {
    title: 'Edit Movie',
    children: [<MovieForm handleFormSubmit={handleFormSubmit} initialMovie={movieInfo} />],
    handleClose: () => {}
  }
};

export const Default: Story = {
  args: {
    title: 'Delete Movie',
    children: [<DeleteForm handleDelete={() => {}}/>],
    handleClose: () => {}
  }
};