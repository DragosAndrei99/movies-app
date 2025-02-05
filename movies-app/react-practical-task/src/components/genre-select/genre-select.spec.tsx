import { fireEvent, render, screen } from '@testing-library/react';

import GenreSelect from './genre-select';

describe('Genre select', () => {
	const GENRES: string[] = [
		'All', 'Comedy', 'Drama', 'Action', 'Adventure'
	];
	test('Should render genres passed in props', () => {
		const onSelectMock = vi.fn();
		render(<GenreSelect genreList={GENRES} currentlySelectedGenre={'All'} onSelect={onSelectMock} />);
		const liElements: HTMLLIElement[] = screen.getAllByRole('listitem');
		
		expect(liElements).toHaveLength(GENRES.length);
	});

	test('Should color border to initial selected Genre', () => {
		const onSelectMock = vi.fn();
		render(<GenreSelect genreList={GENRES} currentlySelectedGenre={'All'} onSelect={onSelectMock} />);
		
		expect(screen.getByText('All').classList.contains('border-rose-500')).toBe(true);
	});

	test('Should handle click on list Genre element', async () => {
		const onSelectMock = vi.fn();
		render(<GenreSelect genreList={GENRES} currentlySelectedGenre={'All'} onSelect={onSelectMock} />);
		const bttnElem: HTMLButtonElement = screen.getByText('Drama');
		fireEvent.click(bttnElem);
		
		expect(onSelectMock).toHaveBeenCalledWith('Drama');
	});
});
