describe('Concerts page', function() {
  it('Should search for a specific concert', function() {
    cy.visit('/');

    cy.get('input[type=text]')
      .type('Concert3').should('have.value', 'Concert3');

    cy.get('.card label .concert-title')
      .should('have.length', 1);
  });

  it('Should filter by province', function() {
    cy.visit('/');

    cy.get('.provinces .select .card label')
      .first()
      .click();

    cy.get('.provinces .select .card ul li')
      .should('have.length', 4);

    cy.get('.provinces .select .card ul li')
      .last()
      .click();

    cy.get('.card label .concert-title')
      .should('have.length', 3);
  });

  it('Should filter by genre', function() {
    cy.visit('/');

    cy.get('.genres .select .card label')
      .first()
      .click();

    cy.get('.genres .select .card ul li')
      .should('have.length', 3);

    cy.get('.genres .select .card ul li input[type=checkbox]')
      .first()
      .click();

    // Click outside to close:
    cy.get('main').click();

    cy.get('.card label .concert-title')
      .should('have.length', 4);
  });
});
