describe("edit my account", () => {
  context("normal flow edit", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
      cy.contains("Logout").should("be.visible");
      cy.url().should('include', '/');
      cy.get('[data-test="sidenav-user-settings"]').click()
      cy.url().should('include', '/user/settings');
    });
    
    it("complete edit first and last name (and change back)", () => {
      cy.get('[data-test="user-settings-firstName-input"]').should('exist')
      cy.get('[data-test="user-settings-lastName-input"]').should('exist')
      cy.get('[data-test="user-settings-email-input"]').should('exist')
      cy.get('[data-test="user-settings-phoneNumber-input"]').should('exist')
      cy.get('[data-test="user-settings-firstName-input"]').clear().type('newName')
      cy.get('[data-test="user-settings-lastName-input"]').clear().type('lastname')
      cy.get('[data-test="user-settings-submit"]').should('be.visible');
      cy.get('[data-test="user-settings-submit"]').click();
      cy.get('[data-test="sidenav-user-full-name"]').contains('newName l').should('exist')

      cy.get('[data-test="user-settings-firstName-input"]').clear().type('Ted')
      cy.get('[data-test="user-settings-lastName-input"]').clear().type('Parisian')
      cy.get('[data-test="user-settings-submit"]').should('be.visible');
      cy.get('[data-test="user-settings-submit"]').click();
      cy.get('[data-test="sidenav-user-full-name"]').contains('Ted P').should('exist')
    });
    
  
  });

  context("invalid flow edit", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
      cy.contains("Logout").should("be.visible");
      cy.url().should('include', '/');
      cy.get('[data-test="sidenav-user-settings"]').click()
      cy.url().should('include', '/user/settings');
    });
    
    it("all empty value", () => {
      cy.get('[data-test="user-settings-firstName-input"]').should('exist')
      cy.get('[data-test="user-settings-lastName-input"]').should('exist')
      cy.get('[data-test="user-settings-email-input"]').should('exist')
      cy.get('[data-test="user-settings-phoneNumber-input"]').should('exist')
      cy.get('[data-test="user-settings-firstName-input"]').clear()
      cy.get('[data-test="user-settings-lastName-input"]').clear()
      cy.get('[data-test="user-settings-email-input"]').clear()
      cy.get('[data-test="user-settings-phoneNumber-input"]').clear()
      cy.get('[id="user-settings-firstName-input-helper-text"]').should('be.visible');
      cy.get('[id="user-settings-lastName-input-helper-text"]').should('be.visible');
      cy.get('[id="user-settings-email-input-helper-text"]').should('be.visible');
      cy.get('[id="user-settings-phoneNumber-input-helper-text"]').should('be.visible');
      cy.get('[data-test="user-settings-submit"]').should('be.disabled');
    });
    
  
  });

});
  