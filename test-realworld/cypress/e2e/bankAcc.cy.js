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
      let initialLength;
      cy.get('[data-test="bankaccount-list"]').children('li').then(($lis) => {
        initialLength = $lis.length;
        expect(typeof initialLength).to.be.equal('number');
      });

      cy.get('[data-test="bankaccount-new"]').click()
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
      cy.get('[data-test="bankaccount-list"]').children('li').then(($lis) => {
        const newLength = $lis.length;
        expect(newLength).to.be.equal(initialLength + 1);
      });
      cy.get('[data-test="bankaccount-list"]')
        .children('li')
        .last()
        .as("newest bank account");
      cy.get("@newest bank account").get('[data-test="bankaccount-delete"]').should('be.visible');
      cy.get("@newest bank account").get('[data-test="bankaccount-delete"]').click();
      cy.get("@newest bank account").contains('aaaaa (Deleted)').should('be.visible');
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
  

// let initialListLength = cy.get('[data-test="bankaccount-list"]')
//   .children('li')
//   .length;
// cy.get('[data-test="bankaccount-new"]').click()
// cy.url().should('include', '/bankaccounts/new');
// cy.get('[data-test="bankaccount-bankName-input"]').should('exist')
// cy.get('[data-test="bankaccount-routingNumber-input"]').should('exist')
// cy.get('[data-test="bankaccount-accountNumber-input"]').should('exist')
// cy.get('[data-test="bankaccount-bankName-input"]').type('aaaaa')
// cy.get('[data-test="bankaccount-routingNumber-input"]').type('000000000')
// cy.get('[data-test="bankaccount-accountNumber-input"]').type('000000000')
// cy.get('[data-test="bankaccount-submit"]').should('be.visible');
// cy.get('[data-test="bankaccount-submit"]').click()
// cy.url().should('include', '/bankaccounts');
// cy.wait(2000);
// cy.get('[data-test="bankaccount-list"]')
//   .children('li')
//   .should('have.length', initialListLength + 1);
// cy.get('[data-test="bankaccount-list"]')
//   .children('li')
//   .last()
//   .as("newest bank account");
// cy.get("@newest bank account").get('[data-test="bankaccount-delete"]').should('be.visible');
// cy.get("@newest bank account").get('[data-test="bankaccount-delete"]').click();
// cy.get("@newest bank account").contains('aaaaa (Deleted)').should('be.visible');