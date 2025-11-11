import { produtos } from '../../cypress.env.json';

describe('Teste 9 - Vai pesquisar um item e verificar as respostas', () => {
    it('Digita o termo desejado e compara com as respostas visíveis pelo site', () => {
        const produtoPesquisado = produtos.find(produtos => produtos.id === 1);
        const termoPesquisado = produtoPesquisado.titulo; // Basta alterar aqui para outro termo de pesquisa
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de produtos na navbar
        cy.get('[href="/products"]').first().should('be.visible').click();

        // Verifica se o site realmente direcionou o usuário para a página do produto clicado
        cy.url().should('eq', 'https://automationexercise.com/products');

        // Encontra a barra de pesquisa e procura o item desejado
        cy.get('[id="search_product"]')
            .should('be.visible')
            .click()
            .clear()
            .type(termoPesquisado);
        cy.get('[id="submit_search"]').should('be.visible').click();

        // Verifica se o texto realmente trouxe o usuário para a página onde ele tem todos os produtos pesquisados
        cy.get('[class="title text-center"]').contains('Searched Products').should('be.visible');

        // Verifica as respostas da pesquisa
        cy.get('[class="productinfo text-center"]').should('be.visible').contains(termoPesquisado);
    });
});
