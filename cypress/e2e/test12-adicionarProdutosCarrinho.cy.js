import { produtos } from '../../cypress.env.json';

describe('Teste 12 - Adicionar produtos no carrinho', () => {
    it('Vai adicionar dois produtos no carrinho e depois verificar se estão corretamente inseridos', () => {
        const produtoVisitado1 = produtos.find(produtos => produtos.id === 1);
        const produtoVisitado2 = produtos.find(produtos => produtos.id === 2);
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
        cy.get('[class="col-sm-4"]').eq(produtoVisitado1.id).should('be.visible');
        cy.adicionarNoCarrinho(produtoVisitado1.id, produtoVisitado1.quantidade);
        cy.get('[class="col-sm-4"]').eq(produtoVisitado2.id).should('be.visible');
        cy.adicionarNoCarrinho(produtoVisitado2.id, produtoVisitado2.quantidade);

        // Vai para a pagina do carrinho
        cy.get('[href="/view_cart"]')
            .first()
            .should('be.visible')
            .click();

        // Verifica se os valores dentro do carrinho estão de acordo com o esperado
        cy.get('[class="table-responsive cart_info"]')
            .should('be.visible')
            .and('contain', produtoVisitado1.titulo)
            .and('contain', produtoVisitado2.titulo);
        // Verifica o carrinho para cada produto
        cy.verificaDadosQuantitativosCarrinho(produtoVisitado1.id, produtoVisitado1.quantidade, produtoVisitado1.preco);
        cy.verificaDadosQuantitativosCarrinho(produtoVisitado2.id, produtoVisitado2.quantidade, produtoVisitado2.preco);
    });
});
