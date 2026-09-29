import userData from "../fixtures/users/userData.json";
import MenuPage from "../pages/menuPage.js";
import LoginPage from "../pages/loginPage.js";
import DashboardPage from "../pages/dashboardPage.js";

const menuPage = new MenuPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
 
describe('Login Page', () => {

 const selectorsList = {
    firstNameField: '[name="firstName"]',
    middleNameField: '[name="middleName"]',
    lastNameField: '[name="lastName"]',
    dateField: '[placeholder="yyyy-dd-mm"]',
    dateCloseButton: '.--close',
    genericField: '.oxd-input',
    dropListArrow: '.oxd-select-text--arrow',
    submitButton: '[type="submit"]'
  }

  it('Login Success', () => {
    cy.visit('/auth/login');
    cy.get(selectorsList.usernameField).type(userData.userSuccess.userName);
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password);
    cy.get(selectorsList.loginButton).click();
    
    cy.get(selectorsList.dashboardGrid);
  })

  it('Login Fail', () => {
    cy.visit('/auth/login');
    cy.get(selectorsList.usernameField).type(userData.userFail.userName);
    cy.get(selectorsList.passwordField).type(userData.userFail.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.wrongCredentialAlert);
  })

  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage();
    loginPage.loginWithUser(userData.userSuccess.userName, userData.userSuccess.password);
    dashboardPage.checkDashboardPage();
    menuPage.acessMyInfo();
    cy.get(selectorsList.firstNameField).clear().type('Santa');
    cy.get(selectorsList.middleNameField).clear().type('Xmas');
    cy.get(selectorsList.lastNameField).clear().type('Claus');
    cy.get(selectorsList.genericField).eq(4).clear().type('EmpID');
    cy.get(selectorsList.dateField).eq(0).clear().type('1988-12-16');
    cy.get(selectorsList.dateCloseButton).click();
    cy.get(selectorsList.dateField).eq(1).clear().type('1992-11-16');
    cy.get(selectorsList.dateCloseButton).click();
    cy.get(selectorsList.dropListArrow).eq(0).click();
    cy.contains('[role="option"]', 'Brazilian').click();
    //saving the new information
    cy.get(selectorsList.submitButton).eq(0).click();
    cy.get('body').should('contain', 'Successfully Updated');
    cy.get('.oxd-toast-close');
  })
})