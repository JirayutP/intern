declare namespace Cypress {
  interface Chainable {
    /**
     * Loggin in to the application via the UI
     * @example cy.login('user@example.com', 's3cr3t')
     * @param {string} username
     * @param {string} password
     */
    login(username: string, password: string): void;
  }
}
