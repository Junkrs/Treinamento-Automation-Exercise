import { produtos } from '../../cypress.env.json';

describe('Teste 8 - Vai verificar a lista de todos os produtos e os detalhes', () => {
    it('Entra na lista de produtos, depois entra no primeiro produto e verifica seus detalhes', () => {
        const produtoVisitado = produtos.find(produtos => produtos.id === 1);
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de produtos na navbar
        cy.get('[href="/products"]').first().should('be.visible').click();

        // Verifica se o texto realmente trouxe o usuário para a página onde ele tem todos os produtos
        cy.get('[class="title text-center"]').contains('All Products').should('be.visible');

        // Verifica se a lista com todos os produtos estão listados
        cy.get('[class="features_items"]').should('be.visible');

        // Visita o primeiro produtos, nesse caso, o eq(1) abaixo, clica no primeiro produto, basta alterar o índice numérico para outro produto
        cy.get('[class="col-sm-4"]').eq(produtoVisitado.id).should('be.visible');
        cy.get(`[href="/product_details/${produtoVisitado.id}"]`).click();

        // Verifica se o site realmente direcionou o usuário para a página do produto clicado
        cy.url().should('eq', `https://automationexercise.com/product_details/${produtoVisitado.id}`);

        // Verifica se todas as informações do produto estão disponíveis e vísiveis
        cy.get('[class="product-information"]')
            .should('be.visible')
            .and('contain', produtoVisitado.titulo)
            .and('contain', produtoVisitado.categoria)
            .and('contain', produtoVisitado.preco)
            .and('contain', produtoVisitado.disponibilidade)
            .and('contain', produtoVisitado.condicao)
            .and('contain', produtoVisitado.marca);
    });
});
