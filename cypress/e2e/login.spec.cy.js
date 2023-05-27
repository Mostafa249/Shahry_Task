// <reference types = "cypress">
describe('Test login functionality', () => {
    let loginCreds;
    beforeEach(() => {
        cy.fixture('loginData').then((data) => {
            loginCreds = data;
        });
        cy.visit('/');
    });
    context("Negative login scenarios", () => {
        it('Should show an error if  usename is empty', () => {
            cy.log('Click on login button without adding user name');
            cy.login(`{backspace}`,loginCreds.correctUserName);
            cy.log('Asset on empty username validation message');
            cy.get(loginCreds.errorMessage).should('be.visible').and('contain', loginCreds.emptyUsernameMessage);
            cy.log('Assertion done successfully ');
        });
        it('Should show an error if  password is empty ', () => {
            cy.log('Click on login button without adding password');
            cy.login(loginCreds.correctUserName,`{backspace}`);
            cy.log('Asset on empty password validation message');
            cy.get(loginCreds.errorMessage).should('be.visible').and('contain', loginCreds.emptyPasswordMessage);
            cy.log('Assertion done successfully ');
        });
        it('Should show an error if username is wrong ', () => {
             cy.log('Click on login button with wrong username');
             cy.login(loginCreds.wrongUserName,loginCreds.correctPassword);
             cy.log('Assert on wrong credentials validation message');
             cy.get(loginCreds.errorMessage).should('be.visible').and('contain', loginCreds.wrongCredantialsMessage);
             cy.log('Assertion done successfully');
        });
        it('Should show an error if password is wrong ', () => {
            cy.log('Click on login button with wrong password');
            cy.login(loginCreds.correctUserName,loginCreds.wrongPassword);
            cy.log('Assert on wrong credentials validation message');
            cy.get(loginCreds.errorMessage).should('be.visible').and('contain', loginCreds.wrongCredantialsMessage);
            cy.log('Assertion done successfully');
        });
    });
    context("Positive login scenario ", () => {
        it('Should login successfully with correct credentials ', () => {
            cy.log('Click on login button with correct credentials');
            cy.login(loginCreds.correctUserName,loginCreds.correctPassword);
            cy.log('Assert on login successfully');
            cy.get('.app_logo').should('be.visible').and('contain', 'Swag Labs');
            cy.log('Assertion done successfully');
        });
    });
});