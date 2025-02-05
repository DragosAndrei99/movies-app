import type { Meta, StoryObj } from '@storybook/react';

import MovieForm from '../components/movie-form/movie-form';
import { FormEvent } from 'react';

const meta = {
  component: MovieForm,
} satisfies Meta<typeof MovieForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleFormSubmit: (e: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      console.log(Object.fromEntries(new FormData(e.currentTarget)))
    }
  }
};