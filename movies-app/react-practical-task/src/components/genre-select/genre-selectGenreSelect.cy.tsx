import React from 'react'
import GenreSelect from './genre-select'

describe('<GenreSelect />', () => {
  it('renders list of genres', () => {
    cy.mount(<GenreSelect genreList={['All', 'Comedy', 'Drama', 'Action', 'Adventure']} currentlySelectedGenre='Drama' onSelect={() => {}}/>)
  })

  it('highlights initially selected genre', () => {
    cy.mount(<GenreSelect genreList={['All', 'Comedy', 'Drama', 'Action', 'Adventure']} currentlySelectedGenre='Drama' onSelect={() => {}}/>)
    cy.contains('Drama').should('have.class', 'border-b-4')
  })

  it('triggers callback function for clicked genre', () => {
    const onClick = cy.stub();

    cy.mount(<GenreSelect genreList={['All', 'Comedy', 'Drama', 'Action', 'Adventure']} currentlySelectedGenre='Drama' onSelect={onClick}/>)
    cy.contains('Comedy').should('not.have.class', 'border-b-4')
    cy.contains('Comedy').click().then(() => {
      expect(onClick).to.be.called;
    });
  })
})