// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", (username, password) => {
  Cypress.log({
    name: "login",
    message: username,
    consoleProps: () => {
      return {
        username,
        password,
      };
    },
  });

  cy.contains("Sign in").click();
  cy.get('[data-test="signin-username"]').type('Heath93')
  cy.get('[data-test="signin-password"]').type('s3cret')
  cy.get('[data-test="signin-remember-me"]').click()
  cy.get('[data-test="signin-submit"]').click()
});
