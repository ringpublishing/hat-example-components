describe('ExternalAPIComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/ExternalAPIComponent');
  })
  it('should render component', () => {
    cy.get(".ExternalAPIComponent").should('be.visible');
  })
  it('should have h2 with text', () => {
    cy.get(".ExternalAPIComponent h2").should('be.visible');
    cy.get(".ExternalAPIComponent h2").contains('Weather in Szczebrzeszyn');
  })
  it('should have table with data', () => {
    cy.get(".ExternalAPIComponent table").should('be.visible');
    cy.get(".ExternalAPIComponent table").contains('Weather');
    cy.get(".ExternalAPIComponent table").contains('Temperature');
    cy.get(".ExternalAPIComponent table").contains('Feel temperature');
    cy.get(".ExternalAPIComponent table").contains('Humidity');
    cy.get(".ExternalAPIComponent table").contains('Pressure');
    cy.get(".ExternalAPIComponent table").contains('Wind speed');
  })
})
