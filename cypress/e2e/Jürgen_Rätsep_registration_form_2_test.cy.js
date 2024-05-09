beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})
const Myuser = 'THill'
const Myemail = 'thomas.hill@gmail.com'
const Myname = 'Thomas'
const Mylast = 'Hill'
const Myphone = '555666777'
const Mypass = '$4f3p*S£$091'

import { faker } from '@faker-js/faker'


/*
Assignement 4:
*/

describe('Section 1: Functional tests', () => {

    })
 
    it('User can submit form with all mandatory fields filled and matching passwords', ()=>{
 
        cy.get('#username').type(Myuser)
        cy.get('#email').type(Myemail)
        cy.get('input[name="name"]').type(Myname)
        cy.get('#lastName').type(Mylast)
        cy.get('[data-testid="phoneNumberTestId"]').type(Myphone)
        cy.get('input[name="password"]').type(Mypass)
        cy.get('input[name="confirm"]').type('1234596€%')
        cy.get("#logo").click()
        cy.get('.submit_button').should('be.visible').should('not.be.enabled')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.get('input[name="password"]').clear().type(Mypass)
        cy.get('input[name="confirm"]').clear().type(Mypass)
        cy.get("#logo").click()
        cy.get('.submit_button').should('be.visible').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
    })
   
    it('User can submit form with ALL fields filled', ()=>{

        cy.get('#username').type(faker.internet.userName())
        cy.get('#email').type(faker.internet.email())
        cy.get('input[name="name"]').type(faker.person.firstName())
        cy.get('#lastName').type(faker.person.lastName())
        cy.get('[data-testid="phoneNumberTestId"]').type(faker.phone.number())
        cy.get('input[type="radio"] + label:contains("CSS")').click()
        cy.get('input[type="checkbox"][name="vehicle2"]').click()
        cy.get('#cars').select('Opel').should('have.value', 'opel')
        cy.get('#animal').select('Hippo').should('have.value', 'hippo')
        cy.get('input[name="password"]').type(Mypass)
        cy.get('input[name="confirm"]').type(Mypass)
        cy.get("#logo").click()
        cy.get('.submit_button').should('be.visible').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#password_error_message').should('not.be.visible')
     })


    it('User can submit form with valid data and ONLY mandatory fields added', ()=>{

        cy.get('#username').type(faker.internet.userName())
        cy.get('#email').type(faker.internet.email())
        cy.get('input[name="name"]').type(faker.person.firstName())
        cy.get('#lastName').type(faker.person.lastName())
        cy.get('[data-testid="phoneNumberTestId"]').type(faker.phone.number())
        cy.get('input[name="password"]').type(Mypass)
        cy.get('input[name="confirm"]').type(Mypass)
        cy.get("#logo").click()
        cy.get('.submit_button').should('be.visible').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.get('#password_error_message').should('not.be.visible')
    })

    it('User can NOT submit form with missing email (mandatory) data', ()=>{

        cy.get('#email').type(faker.internet.email()).clear()

        cy.get('#username').type(faker.internet.userName())
        cy.get('input[name="name"]').type(faker.person.firstName())
        cy.get('#lastName').type(faker.person.lastName())
        cy.get('[data-testid="phoneNumberTestId"]').type(faker.phone.number())
        cy.get('input[name="password"]').type(Mypass)
        cy.get('input[name="confirm"]').type(Mypass)
        cy.get("#logo").click()
        cy.get('.submit_button').should('not.be.enabled')

})


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    
    it.only('Check that Cerebrum logo is correct and has correct size', () => {

        cy.log('Will check logo source and size for Cerebrum')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('#logo').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it.only('Check that Cypress logo is correct and has correct size', () => {

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

        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'horse'])
        })
    })
})