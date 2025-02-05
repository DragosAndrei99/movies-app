import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SearchForm from './search-form';

import "@testing-library/jest-dom";

describe('Search form', () => {
	test('Should render the initial value passed in props', () => {
		render(<SearchForm initialSearchQuery={'Movie-test'} onSearch={vi.fn()}/>);
		const inputElem: HTMLInputElement = screen.getByDisplayValue('Movie-test');
		
    expect(inputElem.value).toBe('Movie-test');
	});

	test('Should handle submit event by clicking SEARCH button', () => {
    const onSearchMock = vi.fn(e => e.preventDefault());
		render(<SearchForm initialSearchQuery={'Movie-searched'} onSearch={onSearchMock}/>);
		const inputElem: HTMLInputElement = screen.getByPlaceholderText('What do you want to watch?');
		const buttonElem: HTMLButtonElement = screen.getByRole('button');
		
		fireEvent.click(buttonElem);
    expect(inputElem.value).toBe('Movie-searched');
    expect(onSearchMock.mock.calls[0][0].target).toContainHTML('value="Movie-searched"');
	});

	test('Should handle submit event by pressing ENTER', async () => {
    const onSearchMock = vi.fn(e => e.preventDefault());
		render(<SearchForm initialSearchQuery={'Movie-searched'} onSearch={onSearchMock}/>);
		const inputElem: HTMLInputElement = screen.getByPlaceholderText('What do you want to watch?');
		
		inputElem.focus();
		userEvent.keyboard('{enter}');
		await waitFor(() => expect(onSearchMock.mock.calls[0][0].target).toContainHTML('value="Movie-searched"'))
	});
});
