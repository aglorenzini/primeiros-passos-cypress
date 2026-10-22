class MyInfoPage {
    selectorsList() {
        const selectors = {
            firstNameField: '[name="firstName"]',
            middleNameField: '[name="middleName"]',
            lastNameField: '[name="lastName"]',
            dateField: '[placeholder="yyyy-dd-mm"]',
            dateCloseButton: '.--close',
            genericField: '.oxd-input',
            dropListArrow: '.oxd-select-text--arrow',
            dropListItem: '[role="option"]',
            submitButton: '[type="submit"]'
        }

        return selectors;
    }

    fillName(firstName, midName, lastName) {
        cy.get(this.selectorsList().firstNameField).clear().type(firstName);
        cy.get(this.selectorsList().middleNameField).clear().type(midName);
        cy.get(this.selectorsList().lastNameField).clear().type(lastName);
    }

    fillEmployeeDetails(employeeID, otherID, driversLicense, expireDate) {
        cy.get(this.selectorsList().genericField).eq(4).clear().type(employeeID);
        cy.get(this.selectorsList().genericField).eq(5).clear().type(otherID);
        cy.get(this.selectorsList().genericField).eq(6).clear().type(driversLicense);
        cy.get(this.selectorsList().dateField).eq(0).clear().type(expireDate);
        cy.get(this.selectorsList().dateCloseButton).click();
    }

    fillPersonalDetail(birthDate, nationality) {
        cy.get(this.selectorsList().dateField).eq(1).clear().type(birthDate);
        cy.get(this.selectorsList().dateCloseButton).click();
        cy.get(this.selectorsList().dropListArrow).eq(0).click();
        cy.contains(this.selectorsList().dropListItem, nationality).click();
    }

    saveForm() {
        cy.get(this.selectorsList().submitButton).eq(0).click();
        cy.get('body').should('contain', 'Successfully Updated');
        cy.get('.oxd-toast-close');
    }
}
export default MyInfoPage