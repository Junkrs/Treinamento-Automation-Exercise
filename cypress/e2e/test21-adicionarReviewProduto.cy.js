import {
  usuario,
  email_usuario,
  produtos
} from '../../cypress.env.json'
import { faker } from '@faker-js/faker'

describe('Teste 21 - Adicionar uma review em um produto', () => {
  it('Vai acessar um produto e escrever uma review, e depois enviar', () => {
    const produtoAvaliado = produtos.find(produtos => produtos.id === 1)
    cy.visit('http://automationexercise.com')

    // Vai para a pagina dos produtos
    cy.get('[href="/products"]')
      .first()
      .should('be.visible')
      .click()

    // Visita um dos produtos para avaliação
    cy.get(`[href="/product_details/${produtoAvaliado.id}"]`).click()

    // Verifica o texto do local de review
    cy.get('[href="#reviews"]').should('be.visible').contains('Write Your Review');

    // Completa o formulário com todos os dados da review
    cy.get('[id="name"]')
        .should('be.visible')
        .clear()
        .type(usuario)
    cy.get('[id="email"]')
        .should('be.visible')
        .clear()
        .type(email_usuario)
    cy.get('[id="review"]')
        .should('be.visible')
        .clear()
        .type(faker.lorem.words(35))
    
    // Aperta o botão de envio
    cy.get('[id="button-review"]').should('be.visible').click()

    // Verifica a mensagem de feedback da review
    cy.get('[class="alert-success alert"]').should('be.visible').contains('Thank you for your review.')
  })
})
