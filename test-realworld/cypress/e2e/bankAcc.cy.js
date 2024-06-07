describe("edit my account", () => {
  context("normal flow edit", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
      cy.contains("Logout").should("be.visible");
      cy.url().should('include', '/');
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.url().should('include', '/bankaccounts');
    });
    
    it("complete create bank account and delete)", () => {
      let initialListLength;
      cy.get('[data-test="bankaccount-list"]').children('li').then(($lis) => {
        initialListLength = $lis.length;
        console.log('Number of visible list items:', initialListLength);
      }).then(()=>{
        cy.get('[data-test="bankaccount-new"]').click({force: true})
        cy.url().should('include', '/bankaccounts/new');
        cy.get('[data-test="bankaccount-bankName-input"]').should('exist')
        cy.get('[data-test="bankaccount-routingNumber-input"]').should('exist')
        cy.get('[data-test="bankaccount-accountNumber-input"]').should('exist')
        cy.get('[data-test="bankaccount-bankName-input"]').type('aaaaa')
        cy.get('[data-test="bankaccount-routingNumber-input"]').type('000000000')
        cy.get('[data-test="bankaccount-accountNumber-input"]').type('000000000')
        cy.get('[data-test="bankaccount-submit"]').should('be.visible');
        cy.get('[data-test="bankaccount-submit"]').click()
        cy.url().should('include', '/bankaccounts');
        cy.wait(2000);
        cy.get('[data-test="bankaccount-list"]')
          .children('li')
          .should('have.length', initialListLength + 1);
      });
      // cy.get('[data-test="bankaccount-list"]')
      //   .children('li')
      //   .last()
      //   .as("newest bank account").then(()=>{})
      // cy.get("@newest bank account").get('[data-test="bankaccount-delete"]').should('exist');
      // cy.get("@newest bank account").get('[data-test="bankaccount-delete"]').click();
      // cy.get("@newest bank account").contains('aaaaa (Deleted)').should('be.visible');
      cy.get('[data-test="bankaccount-list"]')  // Get the bank account list
        .children('li')                             // Get all list items
        .last()                                    // Get the last list item
        .as("newestBankAccount")                   // Alias it for clarity

        .then(($newestBankAccount) => {             // Use .then() to access the element
          const deleteButton = $newestBankAccount.find('[data-test="bankaccount-delete"]');  // Find the delete button within the last list item
          deleteButton.click();                     // Click the delete button for the last account
        })
        .get("@newestBankAccount")                  // Get the last bank account element again
        .contains('aaaaa (Deleted)')                // Verify the deleted message
        .should('exist');;    
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
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.url().should('include', '/bankaccounts');
    });
    
    it("all value empty in create bank account)", () => {
      cy.get('[data-test="bankaccount-new"]').click({force: true});
      cy.url().should('include', '/bankaccounts/new');
      cy.get('[data-test="bankaccount-bankName-input"]').should('exist')
      cy.get('[data-test="bankaccount-routingNumber-input"]').should('exist')
      cy.get('[data-test="bankaccount-accountNumber-input"]').should('exist')
      cy.get('[data-test="bankaccount-bankName-input"]').click()
      cy.get('[data-test="bankaccount-routingNumber-input"]').click()
      cy.get('[data-test="bankaccount-accountNumber-input"]').click()
      cy.get('[data-test="bankaccount-bankName-input"]').click()
      cy.get('[data-test="bankaccount-bankName-input"]').contains('Enter a bank name').should('exist')
      cy.get('[data-test="bankaccount-routingNumber-input"]').contains('Enter a valid bank routing number').should('exist')
      cy.get('[data-test="bankaccount-accountNumber-input"]').contains('Enter a valid bank account number').should('exist')
      cy.get('[data-test="bankaccount-submit"]').should('be.disabled');
    });
  
  });
});