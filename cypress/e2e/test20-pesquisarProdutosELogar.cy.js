import {
  usuario,
  senha,
  email_usuario,
  nome,
  sobrenome,
  empresa,
  endereco,
  pais,
  estado,
  cidade,
  cep,
  celular,
  produtos
} from '../../cypress.env.json'
import { faker } from '@faker-js/faker'

describe('Teste 20 - Vai pesquisar por produtos e depois do login, verificar o carrinho', () => {
  it('Depois de adicionar os produtos no carrinho, vai fazer login e verificar que todos estão lá', () => {
    const produto1 = produtos.find(produtos => produtos.id === 1)
    const produto2 = produtos.find(produtos => produtos.id === 2)
    cy.visit('http://automationexercise.com')

    // Vai para a pagina dos produtos
    cy.get('[href="/products"]')
      .first()
      .should('be.visible')
      .click()

    // Digita o nome do produto e clica no botão de pesquisa
    cy.get('[id="search_product"]').should('be.visible').clear().type(produto1.titulo)
    cy.get('[class="fa fa-search"]').should('be.visible').click()

    // Verifica o título da página
    cy.get('[class="title text-center"]').contains('Searched Products').should('be.visible')

    // Verificar se o produto está visível e o adiciona ao carrinho
    cy.get('[class="col-sm-4"]').eq(produto1.id).should('be.visible')
    cy.adicionarNoCarrinho(produto1.id, produto1.quantidade)

    // TODO: Finalizar esse caso de teste
    // Remove o usuário
    //cy.removerUsuario();
  })
})
