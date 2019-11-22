const DEFAULT_FILTER_NAME = 'OctoLenses Issues';

context('Filters', () => {
  beforeEach(() => {
    cy.window().then(window => {
      window.localStorage.setItem('githubProvider', JSON.stringify({
        settings: {
          token: Cypress.env('GITHUB_TOKEN'),
        },
      }));
    });

    cy.visit(Cypress.env('BASE_URL') + '/');
  });

  it('sees a default filter', () => {
    cy.contains(DEFAULT_FILTER_NAME);
  });

  it('loads a list of issues from the default filter', () => {
    cy.contains('rgehan/octolenses');
  });

  it('can add a GitHub filter', () => {
    createFilter({
      name: 'React PRs',
      predicates: [
        { name: 'Repository', type: 'repo', value: 'facebook/react' },
        { name: 'Type', type: 'type', value: 'PRs', isDropdown: true },
        { name: 'Status', type: 'status', value: 'Open', isDropdown: true },
      ],
    });

    cy.get('[data-id=loader]');
    cy.contains('React PRs');
  });

  it('can delete a filter', () => {
    createFilter({
      name: 'Laravel stuff',
      predicates: [
        { name: 'Repository', type: 'repo', value: 'laravel/framework' },
      ],
    });

    cy.contains(DEFAULT_FILTER_NAME).click();
    cy.contains('Delete').click();
    cy.contains(DEFAULT_FILTER_NAME).should('not.exist');
  });
});

function createFilter({ name, predicates }) {
  // Open the filter modal
  cy.contains('Add').click();

  // Select a GitHub filter
  cy.contains('GitHub').click();
  cy.contains('Continue').click();

  // Rename the filter
  cy.get('[data-id=filter-label-input]')
    .type('{selectAll}{del}')
    .type(name);

  predicates.forEach(({ name, type, value, isDropdown = false }) => {
    cy.get('[data-id=add-predicate-dropdown]').select(name);

    if (isDropdown) {
      cy.get(
        `[data-id=predicate-${type}] [data-id=predicate-value-selector`
      ).select(value);
    } else {
      cy.get(
        `[data-id=predicate-${type}] [data-id=predicate-value-selector`
      ).type(value);
    }
  });

  // Save the filter
  cy.contains('Continue').click();
}
