import type { Meta, StoryObj } from '@storybook/react';

import GenreSelect from '../../src/components/genre-select/genre-select';
import { genreList } from '../components/movie-list-page/movie-list-page';

const meta = {
  component: GenreSelect,
  argTypes: {
    currentlySelectedGenre: { control: "select", options: genreList }
  }
} satisfies Meta<typeof GenreSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { 
  args: 
  { 
    genreList: genreList, 
    currentlySelectedGenre: "Comedy", 
    onSelect: async(movieGenre: string) => {
      console.log(movieGenre);     
     } 
  } 
};