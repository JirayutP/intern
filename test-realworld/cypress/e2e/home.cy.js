describe("home-transaction", () => {
  context("normal flow transaction", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
      cy.contains("Logout").should("be.visible");
      cy.url().should('include', '/');
      cy.get('[data-test="nav-top-new-transaction"]').click()
    });
    
    it("complete pay transaction and cheat amount back", () => {
      cy.get('[data-test="user-list-search-input"]').should('exist')
      cy.get('[data-test="users-list"] li:first').click()
      cy.get('[data-test="transaction-create-amount-input"]').should('exist')
      cy.get('[data-test="transaction-create-amount-input"]').type('100')
      cy.get('[data-test="transaction-create-description-input"]').should('exist')
      cy.get('[data-test="transaction-create-description-input"]').type('aaa')
      cy.get('[data-test="transaction-create-submit-payment"]').should('be.visible');
      cy.get('[data-test="sidenav-user-balance"]').invoke('text').then(($balance) => {
        const initialBalance = parseFloat($balance.replace(/[^0-9.]/g, ''));
        // Click the transaction creation submit button
        cy.get('[data-test="transaction-create-submit-payment"]').click()
        // Wait for the balance to update (might involve waiting for a loader or animation)
        cy.wait(2000); // Replace 2000 with appropriate wait time based on your application
        // Get the balance after the click
        cy.get('[data-test="sidenav-user-balance"]').invoke('text').then(($newBalance) => {
          const newBalance = parseFloat($newBalance.replace(/[^0-9.]/g, ''));
          // Assertion: Verify if the balance decreased by 100
          expect(newBalance).to.be.equal(initialBalance - 100);
        });
      });
      cy.get('[data-test="new-transaction-create-another-transaction"]').should('exist')
      cy.get('[data-test="new-transaction-create-another-transaction"]').click()
      cy.get('[data-test="users-list"] li:first').click()
      cy.get('[data-test="transaction-create-amount-input"]').type('-100')
      cy.get('[data-test="transaction-create-description-input"]').type('aaa')
      cy.get('[data-test="transaction-create-submit-payment"]').click()
    });
    
    it("complete request transaction", () => {
      cy.get('[data-test="user-list-search-input"]').should('exist')
      cy.get('[data-test="users-list"] li:first').click()
      cy.get('[data-test="transaction-create-amount-input"]').should('exist')
      cy.get('[data-test="transaction-create-amount-input"]').type('100')
      cy.get('[data-test="transaction-create-description-input"]').should('exist')
      cy.get('[data-test="transaction-create-description-input"]').type('aaa')
      cy.get('[data-test="transaction-create-submit-request"]').should('be.visible');
      cy.get('[data-test="sidenav-user-balance"]').invoke('text').then(($balance) => {
        const initialBalance = parseFloat($balance.replace(/[^0-9.]/g, ''));
        // Click the transaction creation submit button
        cy.get('[data-test="transaction-create-submit-request"]').click()
        // Wait for the balance to update (might involve waiting for a loader or animation)
        cy.wait(2000); // Replace 2000 with appropriate wait time based on your application
        // Get the balance after the click
        cy.get('[data-test="sidenav-user-balance"]').invoke('text').then(($newBalance) => {
          const newBalance = parseFloat($newBalance.replace(/[^0-9.]/g, ''));
          // Assertion: Verify if the balance
          expect(newBalance).to.be.equal(initialBalance);
        });
      });
      cy.get('[data-test="new-transaction-create-another-transaction"]').should('exist')
    });
  
  });

  context("invalid flow transaction", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
      cy.contains("Logout").should("be.visible");
      cy.url().should('include', '/');
      cy.get('[data-test="nav-top-new-transaction"]').click()
    });
    
    it("empty value in process payment", () => {
      cy.get('[data-test="user-list-search-input"]').should('exist')
      cy.get('[data-test="users-list"] li:first').click()
      cy.get('[data-test="transaction-create-amount-input"]').should('exist')
      cy.get('[data-test="transaction-create-description-input"]').should('exist')
      cy.get('[data-test="transaction-create-amount-input"]').click()
      cy.get('[data-test="transaction-create-description-input"]').click()
      cy.get('[data-test="transaction-create-amount-input"]').click()
      cy.get('[data-test="transaction-create-submit-payment"]').should('be.disabled');
      cy.get('[data-test="transaction-create-submit-request"]').should('be.disabled');
    });
    
  
  });

});
  