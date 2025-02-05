import type { Meta, StoryObj } from '@storybook/react';
import SortControl from '../components/sort-control/sort-control';
import { ChangeEvent } from 'react';

function selectionChange(e: ChangeEvent<HTMLOptionElement>) {
  console.log(e.currentTarget.value);
}

const meta = {
  component: SortControl,
  argTypes: {
    currentSelection: {control: 'select', options: ['Release Date', 'Title']}
  }
} satisfies Meta<typeof SortControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentSelection: 'Release Date',
    handleSelectionChange: selectionChange
  }
};