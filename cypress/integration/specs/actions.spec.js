/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/commands/actions')
    cy.eyesOpen({
      testName: Cypress.mocha.getRunner().suite.ctx.currentTest.title,
    });
  })

  afterEach(() => {
    cy.eyesClose();
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.action-email')
      .type('fake@email.com').should('have.value', 'fake@email.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com')
    
    cy.eyesCheckWindow({
      tag: 'low.typing@email.com',
      target: 'window',
      fully: false,
      ignore: [{selector: 'body > div.banner > div'}]
    });

    cy.get('.action-disabled')
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type('disabled error checking', { force: true })
      .should('have.value', 'disabled error checking')

    cy.eyesCheckWindow({
      tag: 'disabled error checking',
      target: 'region',
      selector: {
        type: 'css',
        selector: '.action-disabled'
      }
    });
  })

  it('.focus() - focus on a DOM element', () => {
    // https://on.cypress.io/focus
    cy.get('.action-focus').focus()
      .should('have.class', 'focus')
      .prev().should('have.attr', 'style', 'color: orange;')
    
    cy.eyesCheckWindow({
      tag: 'color: orange',
      target: 'region',
      selector: {
        type: 'css',
        selector: '.action-focus'
      }
    });
  })

  it('.blur() - blur off a DOM element', () => {
    // https://on.cypress.io/blur
    cy.get('.action-blur').type('About to blur').blur()
      .should('have.class', 'error')
      .prev().should('have.attr', 'style', 'color: red;')
    
    cy.eyesCheckWindow({
      tag: 'color: red',
      target: 'region',
      selector: {
        type: 'css',
        selector: '.action-blur'
      }
    });
  })

  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear').type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '')

    cy.eyesCheckWindow({
      tag: 'Cleared Text Field',
      target: 'region',
      selector: {
        type: 'css',
        selector: '.action-clear'
      }
    });
  })

  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form')
      .find('[type="text"]').type('HALFOFF')
    cy.get('.action-form').submit()
      .next().should('contain', 'Your form has been submitted!')

    cy.eyesCheckWindow({
      tag: 'Your form has been submitted!',
      target: 'region',
      selector: {
        type: 'css',
        selector: '.action-form'
      }
    });
  })

  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click()
    
    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click()

    cy.get('#action-canvas').click('topLeft')
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('topRight')
    cy.get('#action-canvas').click('left')
    cy.get('#action-canvas').click('right')
    cy.get('#action-canvas').click('bottomLeft')
    cy.get('#action-canvas').click('bottom')
    cy.get('#action-canvas').click('bottomRight')

    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)

    cy.get('#action-canvas')
      .click(80, 75) // click 80px on x coord and 75px on y coord
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165)

    cy.eyesCheckWindow({
      tag: 'Lots of Clicks...',
      target: 'region',
      selector: {
        type: 'css',
        selector: '#action-canvas'
      }
    });

    // click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({ multiple: true })

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({ force: true })

  })

  it('.scrollIntoView() - scroll an element into view', () => {


    cy.get('#scroll-vertical button')
      .should('not.be.visible')
    
    cy.eyesCheckWindow({
      tag: 'Verticle Scrolling',
      target: 'region',
      fully: true,
      selector: {
        type: 'css',
        selector: '#scroll-vertical'
      }
    });

  })

  it('Full Page Screenshot', () => {


    cy.get('#scroll-vertical button')
      .should('not.be.visible')
    
      cy.eyesCheckWindow({
        tag: 'Full Page',
        target: 'window',
        fully: true,
      });

  })
  
})
