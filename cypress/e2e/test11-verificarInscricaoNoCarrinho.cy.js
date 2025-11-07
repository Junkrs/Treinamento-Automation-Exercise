import { email_usuario } from '../../cypress.env.json'

describe('Teste 11 - Inscrever o email do usuário na página do carrinho', () => {
  it('Inscreve o email do usuário na página do carrinho', () => {
    cy.visit('http://automationexercise.com')

    // Verifica se o header e o footer estão visíveis
    cy.get('[id="header"]').should('be.visible')
    cy.get('[id="footer"]').should('be.visible')

    // Vai para a pagina do carrinho
    cy.get('[href="/view_cart"]')
      .first()
      .should('be.visible')
      .click()

    // Clica no campo do email, digita e aperta o botao
    cy.get('[id="susbscribe_email"]')
      .should('be.visible')
      .clear()
      .type(email_usuario)
    cy.get('[id="subscribe"]').should('be.visible').click()

    // Verifica a mensagem de confirmação
    cy.get('[class="alert-success alert"]')
      .should('be.visible')
      .contains('You have been successfully subscribed!')
  })
})
