describe('Routing E2E tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Displays a search form and list of movies on the home page', () => {
    cy.get('form').should('exist');
    cy.get('#movie-list').should('exist');
  });

  it('Updates URL with search query on form submit and refreshes movie list', () => {
    cy.get('input[name="search"]').type('Inception');
    cy.get('form').submit();
    
    cy.url().should('include', '?query=Inception');
    cy.get('#movie-list').should('contain', 'Inception');
  });

  it('Displays search form with entered text and relevant movie list for URL query param', () => {
    cy.visit('http://localhost:5173/?query=Inception');

    cy.get('#movie-list').should('contain', 'Inception');
  });

  it('Updates URL with genre and refreshes movie list by genre', () => {
    cy.get('#Comedy').click();
    cy.url().should('include', 'genre=Comedy');
    cy.get('#movie-list').should('contain', 'Comedy');
  });

  it('Updates URL with genre and refreshes movie list by genre when adding search param in URL', () => {
    cy.visit('http://localhost:5173/?genre=Comedy');

    cy.url().should('include', 'genre=Comedy');
    cy.get('#movie-list').should('contain', 'Comedy');
  });


  it('Updates URL with sorting by title and select is changed to title', () => {
    cy.visit('http://localhost:5173/?sort=Title');
    cy.get('select[name="sort"]').should('contain', 'Title');
  });

  it('Change sort to title and search param is updated', () => {
    cy.get('select[name="sort"]').select('Title');
    cy.url().should('include', 'sort=Title');
  });

  it('Displays correct search form values, selected genre, and sorted movie list for combined search params', () => {
    cy.visit('http://localhost:5173/?query=Coco&genre=Comedy&sort=Title');
    cy.get('#Comedy').should('have.class', 'border-rose-500');
    cy.get('select[name="sort"]').should('have.value', 'Title');
    cy.get('#movie-list').should('contain', 'Comedy').and('contain', 'Coco');
  });

  it('Navigates to movie details with movie ID in URL, preserves query parameters, and maintains movie list', () => {
    cy.get('select[name="sort"]').select('Title');
    cy.get('#Comedy').click();
    cy.get('input[name="search"]').type('Coco');
    cy.get('form').submit();

    cy.get('#movie-item').first().click()
    cy.url().should('match', /\d\/\?sort=Title&genre=Comedy&query=Coco/);
    cy.get('#movie-list').should('exist'); 
  });

  it('Displays movie details and list of movies for /:movieId route', () => {
    const movieId = '252178';
    cy.visit(`http://localhost:5173/${movieId}`);
    
    cy.get('#movie-details').should('exist');
    cy.get('#movie-list').should('exist');
  });
})