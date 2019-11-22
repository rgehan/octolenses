Cypress.Commands.add('injectGithubToken', () => {
  cy.window().then(window => {
    window.localStorage.setItem(
      'githubProvider',
      JSON.stringify({
        settings: {
          token: Cypress.env('GITHUB_TOKEN'),
        },
      })
    );
  });
});
