import {
  produtos
} from '../../cypress.env.json'
// Não terminado, esse teste não funciona ainda
describe('Teste 22 - Adicionar no carrinho um dos itens recomendados', () => {
  it('Vai verificar os itens recomendados e irá colocar no carrinho', () => {
    const produtoRecomendado = produtos.find(produtos => produtos.id === 1)
    cy.visit('http://automationexercise.com')

    // Vai para o final da página e verifica se existem os itens recomendados
    cy.get('[class="title text-center"]').should('be.visible').contains('recommended items');

    // Seleciona o produto escolhido e envia para o carrinho
    cy.get('[id="recommended-item-carousel"]')
        .should('be.visible')
        .find('[class="btn btn-default add-to-cart"]')
        .eq(4)
        .click()

    // Vai para a pagina do carrinho
    cy.get('[href="/view_cart"]')
      .first()
      .should('be.visible')
      .click()

    // Verifica se os valores dentro do carrinho estão de acordo com o esperado
    cy.get('[class="table-responsive cart_info"]')
      .should('be.visible')
      .and('contain', produtoRecomendado.titulo)
    // Verifica o carrinho para o produto
    cy.verificaDadosQuantitativosCarrinho(produtoRecomendado.id, produtoRecomendado.quantidade, produtoRecomendado.preco)
  })
})
