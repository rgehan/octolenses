context('Discover', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL') + '/');

    cy.get('[data-header-link=settings]').click();
  });

  it('opens, then closes the settings modal', () => {
    cy.contains('Settings');
    cy.contains('Close').click();
    cy.contains('Settings').should('not.exist');
  });

  it('changes to night mode', () => {
    // Check it's not using dark mode
    cy.get('body.dark').should('not.exist');

    // Switch to dark mode
    cy.contains('Night mode').click();
    cy.contains('Always').click();

    // Check dark mode is applied
    cy.get('body.dark');
  });

  it('clears the cache', () => {
    cy.contains('Cache').click();
    cy.contains('Clear cache').click();
    cy.contains('Cache was successfully cleared');
  });

  it('sets the GitHub token', () => {
    cy.contains('GitHub').click();
    cy.get('input').type('my-token');
    cy.contains('Save').click();
    cy.contains('Token was saved');
  });
});
