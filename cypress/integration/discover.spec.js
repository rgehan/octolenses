context('Discover', () => {
  beforeEach(() => {
    cy.injectGithubToken();

    cy.visit(Cypress.env('BASE_URL') + '/');

    cy.get('[data-header-link=discover]').click();
  });

  it('loads a default set of repos', () => {
    cy.get('[data-id=loader]');
    cy.get('[data-id=repo-card]');
  });

  it('can change the language', () => {
    // Let it load
    cy.get('[data-id=loader]');
    cy.get('[data-id=repo-card]');

    // Change the language to JavaScript
    cy.get('[data-id=dropdown-language').select('JavaScript');

    // Let it load again, and check it loaded JavaScript repos
    cy.get('[data-id=loader]');
    cy.get('[data-id=repo-card]').contains('JavaScript');
  });

  it('can change the period', () => {
    // Let it load
    cy.get('[data-id=loader]');
    cy.get('[data-id=repo-card]');

    // Change the language to JavaScript
    cy.get('[data-id=dropdown-dateRange').select('Last month');

    // Let it load again, and check it loaded JavaScript repos
    cy.get('[data-id=loader]');
    cy.get('[data-id=repo-card]');
  });

  it('redirects to the repo on click', () => {
    // Let it load, and assert it would have opened in a new tab on click
    cy.get('[data-id=loader]');
    cy.get('[data-id=repo-card]:first-child [data-id=repo-link]').should(
      'have.attr',
      'target',
      '_blank'
    );
  });
});
