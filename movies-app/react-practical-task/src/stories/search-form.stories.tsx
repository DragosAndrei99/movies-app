import type { Meta, StoryObj } from '@storybook/react';

import SearchForm from '../components/search-form/search-form';
import { ChangeEvent } from 'react';

const meta = {
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialSearchQuery: "Movie Searched",
    onSearch: (e: ChangeEvent<HTMLFormElement>) => {    
      e?.preventDefault();
    }
  }
};