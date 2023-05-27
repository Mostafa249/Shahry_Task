let cartIcon = '#shopping_cart_container'
describe('Checkout process e2e scenario',()=>{
   let loginCreds;
   let chosenItem;
   let checkoutData;
    before(() => {
        cy.fixture('loginData').then((data) => {
            loginCreds = data;
        });
         cy.fixture('items').then((data) => {
            chosenItem = data;
         });
         cy.fixture('checkoutInformation').then((data) => {
                     checkoutData = data;
         });
        cy.visit('/');
    });
    it('successfully checkout  ',()=>{
       cy.log('Login command for successful login');
             cy.login(loginCreds.correctUserName, loginCreds.correctPassword);
             cy.log('Assert successful login ');
             cy.get('.app_logo').should('be.visible').and('contain', 'Swag Labs');
             cy.log('Add 3 items to cart command');
             cy.addToCart(chosenItem.firstItem,chosenItem.secondItem,chosenItem.thirdItem,cartIcon);
             cy.log('Assert on cart screen header');
             cy.get('.header_secondary_container').should('be.visible').and('contain','Your Cart');
             cy.log('Assert that number of items in cart is equal to number of added items');
             cy.get('.cart_item').should('have.length','3');
             cy.log('Click on checkout button');
             cy.get('[data-test="checkout"]').should('be.visible').click();
             cy.log('Assert on checkout information screen');
             cy.get('.header_secondary_container').should('be.visible')
             .and('contain','Checkout: Your Information');
             cy.log('Enter first name');
             cy.get(checkoutData.firstNameField).type(checkoutData.firstName);
             cy.log('Enter last name');
             cy.get(checkoutData.lastNameField).type(checkoutData.lastName);
             cy.log('Enter postal code');
             cy.get(checkoutData.postalCodeField).type(checkoutData.postalCode);
             cy.log('Click on continue button');
             cy.get('[data-test="continue"]').click();
             cy.log('Assert on being in checkout overview screen');
             cy.get('.header_secondary_container').should('be.visible')
                          .and('contain','Checkout: Overview');
             cy.log('Checkout information accepted successfully ');
             cy.log('Assert that checkout overview contains 3 items and assert their names');
             cy.get('.inventory_item_name').then(($els) => {
                         return (
                           Cypress.$.makeArray($els)
                             .map((el) => el.innerText)
                         )
                       })
                       .should('deep.equal',
                       [chosenItem.firstItemName, chosenItem.secondItemName, chosenItem.thirdItemName]);
                       cy.log('Assert that added items have the correct prices');
                       cy.get('.inventory_item_price').then(($els)=> {
                          return (
                            Cypress.$.makeArray($els)
                              .map((el) => el.innerText)
                          )
                        }).should('deep.equal',
                        [`$${chosenItem.firstItemPrice}`,`$${chosenItem.secondItemPrice}`,`$${chosenItem.thirdItemPrice}`]);
                        cy.log('Assert that total price equal tha sum of added prices');
                        let totalPrice =  chosenItem.firstItemPrice + chosenItem.secondItemPrice + chosenItem.thirdItemPrice;
                        cy.get('.summary_subtotal_label').then($value=>{
                         return $value.text()
                        }).should('contain',`$${totalPrice}`);
                        cy.log('Click on finish button too complete checkout process');
                        cy.get('[data-test="finish"]').click();
                        cy.log('Assert that checkout completed successfully ');
                        cy.get('.complete-header').should('be.visible')
                        .and('contain','Thank you for your order!');
     });
});