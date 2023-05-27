//login command
Cypress.Commands.add('login',(userName,password)=>{
cy.get("#user-name").type(userName);
cy.get('#password').type(password);
cy.get('#login-button').click();
});
//Add items to cart command
Cypress.Commands.add('addToCart',(first,second,third,icon)=>{
        cy.get(first).should('be.visible').click();
        cy.get(second).should('be.visible').click();
        cy.get(third).should('be.visible').click();
        cy.get(icon).should('be.visible').and('contain', '3').click();
});
//Remove item from cart
Cypress.Commands.add('removeFromCart',()=>{
        cy.get('button:visible:contains("Remove")').should('have.length', 3);
        cy.get('button:visible:contains("Remove")').eq(1).click();
});