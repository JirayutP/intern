describe("authentication", () => {
  context("normal flow login", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    
    it("user should be able to login", () => {
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
      cy.contains("Logout").should("be.visible");
    });
  
    it("user should be able to logout", () => {
      cy.fixture("user").then((user) => {
        cy.login(user.username, user.password);
      });
  
      cy.contains("Logout").as("logout");
      cy.get("@logout").should("be.visible");
      cy.get("@logout").click();
  
      cy.contains("Sign in").should("be.visible");
    });
  });

  context("invalid flow login", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    
    it("empty username", () => {
      cy.get('[data-test="signin-username"]').click()
      cy.get('[data-test="signin-password"]').click()
      cy.get('[data-test="signin-username"]').contains('Username is required').should('exist')
      cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it("invalid username", () => {
      cy.get('[data-test="signin-username"]').type('Heath939')
      cy.get('[data-test="signin-password"]').type('s3cret')
      cy.get('[data-test="signin-remember-me"]').click()
      cy.get('[data-test="signin-submit"]').click()
      cy.url().should('include', '/signin');
      cy.get('[data-test="signin-error"]').contains('Username or password is invalid').should('exist')
    });

    it("incorrect passsword", () => {
      cy.get('[data-test="signin-username"]').type('Heath93')
      cy.get('[data-test="signin-password"]').type('s3crettt')
      cy.get('[data-test="signin-remember-me"]').click()
      cy.get('[data-test="signin-submit"]').click()
      cy.url().should('include', '/signin');
      cy.get('[data-test="signin-error"]').contains('Username or password is invalid').should('exist')
    });
  });

  context("invalid flow register (did not submit)", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get('[data-test="signup"]').click()
      cy.url().should('include', '/signup');
    });
    
    it("empty all value", () => {
      cy.get('[data-test="signup-first-name"]').click()
      cy.get('[data-test="signup-last-name"]').click()
      cy.get('[data-test="signup-username"]').click()
      cy.get('[data-test="signup-password"]').click()
      cy.get('[data-test="signup-confirmPassword"]').click()
      cy.get('[data-test="signup-first-name"]').click()
      cy.get('[data-test="signup-first-name"]').contains('First Name is required').should('exist')
      cy.get('[data-test="signup-last-name"]').contains('Last Name is required').should('exist')
      cy.get('[data-test="signup-username"]').contains('Username is required').should('exist')
      cy.get('[data-test="signup-password"]').contains('Enter your password').should('exist')
      cy.get('[data-test="signup-confirmPassword"]').contains('Confirm your password').should('exist')
      cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it("all value valid", () => {
      cy.get('[data-test="signup-first-name"]').type('aa')
      cy.get('[data-test="signup-last-name"]').type('aa')
      cy.get('[data-test="signup-username"]').type('aa')
      cy.get('[data-test="signup-password"]').type('aaaa')
      cy.get('[data-test="signup-confirmPassword"]').type('aaaa')
      cy.get('[data-test="signup-submit"]').should('be.visible');
    });

    it("invalid password", () => {
      cy.get('[data-test="signup-first-name"]').type('aa')
      cy.get('[data-test="signup-last-name"]').type('aa')
      cy.get('[data-test="signup-username"]').type('aa')
      cy.get('[data-test="signup-password"]').type('aaa')
      cy.get('[data-test="signup-password"]').contains('Password must contain at least 4 characters').should('exist')
      cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it("confirm password not match", () => {
      cy.get('[data-test="signup-first-name"]').type('aa')
      cy.get('[data-test="signup-last-name"]').type('aa')
      cy.get('[data-test="signup-username"]').type('aa')
      cy.get('[data-test="signup-password"]').type('aaaa')
      cy.get('[data-test="signup-confirmPassword"]').type('aaa')
      cy.get('[data-test="signup-confirmPassword"]').contains('Password does not match').should('exist')
      cy.get('[data-test="signup-submit"]').should('be.disabled');
    });
  
  });

});
  