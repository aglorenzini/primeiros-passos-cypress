import userData from "../fixtures/users/userData.json";

const selectorsList = {
  usernameField: "[name='username']",
  passwordField: "[name='password']",
  loginButton: ".oxd-button",
  sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
  dashboardGrid: ".orangehrm-dashboard-grid",
  wrongCredentialAlert: ".oxd-alert",
  myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
  firstNameField: '[name="firstName"]',
  middleNameField: '[name="middleName"]',
  lastNameField: '[name="lastName"]',
  dateField: '[placeholder="yyyy-dd-mm"]',
  dateCloseButton: '.--close',
  genericField: '.oxd-input',
  submitButton: '[type="submit"]'
}

describe('Login Page', () => {
  it('Login Success', () => {
    cy.visit('/auth/login');
    cy.get(selectorsList.usernameField).type(userData.userSuccess.userName);
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password);
    cy.get(selectorsList.loginButton).click();
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
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
    cy.visit('/auth/login');
    cy.get(selectorsList.usernameField).type(userData.userSuccess.userName);
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password);
    cy.get(selectorsList.loginButton).click();
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
    cy.get(selectorsList.dashboardGrid);
    cy.get(selectorsList.myInfoButton).click();
    cy.get(selectorsList.firstNameField).clear().type('Santa');
    cy.get(selectorsList.middleNameField).clear().type('Xmas');
    cy.get(selectorsList.lastNameField).clear().type('Claus');
    cy.get(selectorsList.genericField).eq(4).clear().type('EmpID');
    cy.get(selectorsList.dateField).eq(0).clear().type('1988-12-16');
    cy.get(selectorsList.dateCloseButton).click();
    cy.get(selectorsList.dateField).eq(1).clear().type('1992-11-16');
    cy.get(selectorsList.dateCloseButton).click();
    cy.get(selectorsList.submitButton).eq(0).click();
    cy.get('body').should('contain', 'Successfully Updated');
    cy.get('.oxd-toast-close');
  })
})