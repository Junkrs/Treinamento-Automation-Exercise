import { produtos } from '../../cypress.env.json';

describe('Teste 13 - Verificar a quantidade de produtos no carrinho', () => {
    it('Vai acessar um produto, inserir no carrinho e verificar se a quantidade está correta', () => {
        const produtoVisitado = produtos.find(produtos => produtos.id === 1);
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Vai para a pagina dos produtos
        cy.get('[href="/products"]')
            .first()
            .should('be.visible')
            .click();

        // Adiciona os produtos no carrinho, baseado na sua ID e na quantidade
        cy.get('[class="col-sm-4"]').eq(produtoVisitado.id).should('be.visible');
        cy.adicionarNoCarrinho(produtoVisitado.id, produtoVisitado.quantidade);

        // Vai para a pagina do carrinho
        cy.get('[href="/view_cart"]')
            .first()
            .should('be.visible')
            .click();

        // Verifica se os valores dentro do carrinho estão de acordo com o esperado
        cy.get('[class="table-responsive cart_info"]')
            .should('be.visible')
            .and('contain', produtoVisitado.titulo);
        // Verifica a quantidade no carrinho para o produto
        cy.get(`[id="product-${produtoVisitado.id}"]`)
            .should('be.visible')
            .within(() => {
                // Verifica se a quantidade está correta
                cy.get('[class="cart_quantity"]').should('be.visible').contains(produtoVisitado.quantidade);
            });
    });
});
