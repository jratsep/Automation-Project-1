beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})
const Myuser = 'THill'
const Myemail = 'thomas.hill@gmail.com'
const Myname = 'Thomas'
const Mylast = 'Hill'
const Myphone = '555666777'
const Mypass = '$4f3p*S£$091'
const Randompass = faker.internet.Randompass

import { faker } from '@faker-js/faker'

function inputValidDataMandatoryFields() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(faker.internet.userName())
    cy.get('#email').type(faker.internet.email())
    cy.get('[data-cy="name"]').type(faker.person.firstName())
    cy.get('#lastName').type(faker.person.lastName())
    cy.get('[data-testid="phoneNumberTestId"]').type(faker.phone.number())
    cy.get('#password').type(Mypass)
    cy.get('#confirm').type(Mypass)
    cy.get('h2').contains('Password').click()  
}

function inputValidDataAllFields() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(faker.internet.userName())
    cy.get('#email').type(faker.internet.email())
    cy.get('[data-cy="name"]').type(faker.person.firstName())
    cy.get('#lastName').type(faker.person.lastName())
    cy.get('[data-testid="phoneNumberTestId"]').type(faker.phone.number())
    cy.get('#htmlFavLanguage').check()
    cy.get('#vehicle2').check()
    cy.get('#cars').select('Audi')
    cy.get('#animal').select('Dog')
    cy.get('#password').type(Mypass)
    cy.get('#confirm').type(Mypass)
    cy.get('h2').contains('Password').click()  
}


/*
Assignement 4:
*/

describe('Section 1: Functional tests', () => {

    })
 
    it('User can submit form with all mandatory fields filled and matching passwords', ()=>{
        
        inputValidDataMandatoryFields();

        cy.get('.submit_button').should('be.visible').and('be.enabled').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
    })

    it('User can NOT submit form with all mandatory fields filled but NOT matching passwords', ()=>{
 
        inputValidDataMandatoryFields();

        cy.get('#password').clear().type('1111111')
        cy.get('#confirm').clear().type('22222222')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
    })
   
    it('User can submit form with ALL fields filled', ()=>{

        inputValidDataAllFields();
        cy.get('.submit_button').should('be.visible').and('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#password_error_message').should('not.be.visible')
     })


    it('User can submit form with valid data and ONLY mandatory fields added', ()=>{

        inputValidDataMandatoryFields();
        cy.get('.submit_button').should('be.visible').and('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#password_error_message').should('not.be.visible')
    })

    it('User can NOT submit form with missing email (mandatory) data', ()=>{
        
        inputValidDataMandatoryFields();
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')

})


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    
    it('Check that Cerebrum logo is correct and has correct size', () => {

        cy.log('Will check logo source and size for Cerebrum')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that Cypress logo is correct and has correct size', () => {

        cy.log('Will check logo source and size for Cypress image')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').invoke('width').should('be.lessThan', 200)
            .and('be.greaterThan', 100)   


    });

    it('Check navigation part 1', () => {
        
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').children().eq(0).should('be.visible').and('have.attr', 'href', 'registration_form_1.html').click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {

        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {

        cy.get('input[type="checkbox"]').should('have.length', 3)  

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        cy.get('#vehicle1').click()
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        cy.get('#vehicle2').click()
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
})

    it('Car dropdown is correct', () => {

        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {

        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
        })
    })