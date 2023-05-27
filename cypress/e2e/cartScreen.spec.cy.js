//let cartIcon = '#shopping_cart_container'
//describe("Adding and removing items from cart e2e scenario", () => {
//    let loginCreds;
//    let chosenItem;
//    before(() => {
//        cy.fixture('loginData').then((data) => {
//            loginCreds = data;
//        });
//         cy.fixture('items').then((data) => {
//            chosenItem = data;
//         });
//        cy.visit('/');
//    });
//    it('Verify adding and removing items from cart ',()=>{
//        cy.log('Login command for successful login');
//        cy.login(loginCreds.correctUserName, loginCreds.correctPassword);
//        cy.log('Assert successful login ');
//        cy.get('.app_logo').should('be.visible').and('contain', 'Swag Labs');
//        cy.log('Add 3 items to cart command');
//        cy.addToCart(chosenItem.firstItem,chosenItem.secondItem,chosenItem.thirdItem,cartIcon);
//        cy.log('Assert on cart screen header');
//        cy.get('.header_secondary_container').should('be.visible').and('contain','Your Cart');
//        cy.log('Assert that number of items in cart is equal to number of added items');
//        cy.get('.cart_item').should('have.length','3');
//        cy.log('Loop on items in the screen and validate their names ');
//        cy.get('.inventory_item_name').then(($els) => {
//            return (
//              Cypress.$.makeArray($els)
//                .map((el) => el.innerText)
//            )
//          })
//          .should('deep.equal',
//          [chosenItem.firstItemName, chosenItem.secondItemName, chosenItem.thirdItemName]);
//          cy.log('Remove item from cart command');
//          cy.removeFromCart();
//          cy.log('Assert on remaining items in cart');
//          cy.get('.cart_item').should('have.length','2');
//    });
//});