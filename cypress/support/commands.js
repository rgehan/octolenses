Cypress.Commands.add('injectGithubToken', () => {
  cy.window().then(window => {
    const token = Cypress.env('GITHUB_TOKEN');

    if (!token) {
      throw new Error(
        'No CYPRESS_GITHUB_TOKEN environement variable was provided!'
      );
    }

    window.localStorage.setItem(
      'githubProvider',
      JSON.stringify({
        settings: {
          token,
        },
      })
    );
  });
});
