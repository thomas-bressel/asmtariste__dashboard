describe('Dashboard App E2E', () => {



  it('should display login page', () => {
    cy.visit('/login');
    cy.contains('Identifiez-vous ICI');
    cy.contains('Et commencez à utiliser Drawer en quelques secondes');
  });



  it('should display homepage', () => {
    cy.visit('/');
    cy.get('main').should('be.visible');

    cy.visit('/login');
    cy.get('main').should('be.visible');
  });


  it('should redirect to login when accessing protected route', () => {
    cy.visit('/articles');
    cy.url().should('include', '/');
   
  });



  it('should toggle password visibility', () => {
    cy.visit('/');
  
    // Check if the type is password
    cy.get('[name="password"]').should('have.attr', 'type', 'password');
  
    // fill the field
    cy.get('[name="password"]').type('password123');
    cy.get('[name="password"]').should('have.value', 'password123');
    
    // click on the icon
    cy.get('img[src*="eye-on"]').click();
    cy.get('[name="password"]').should('have.attr', 'type', 'text');
    
    //click back on the icon
    cy.get('img[src*="eye-off"]').click();
    cy.get('[name="password"]').should('have.attr', 'type', 'password');
  });


  
  it('should fill login form', () => {

    // 1. Go to root route
    cy.visit('/');

    // 2. The button should not exist
    cy.get('button[type="submit"]').should('not.exist');
    
    // 3. Test the input fields
    cy.get('[name="nickname"]').type('testuser');
    cy.get('[name="nickname"]').should('have.value', 'testuser');

    // 4. The button still not exist
    cy.get('button[type="submit"]').should('not.exist');

    // 5. Test and fill the input password field
    cy.get('[name="password"]').type('password123');
    cy.get('[name="password"]').should('have.value', 'password123');
    
    // 6. Then the button appears !
    cy.get('button[type="submit"]').should('be.visible');    

    // 7. Clear the nickname field 
    cy.get('[name="nickname"]').clear();
    
    // 8. Button disappear
    cy.get('button[type="submit"]').should('not.exist');
  });




});