describe('Teste 17 - Adicionar produtos no carrinho e depois remover', () => {
    it('Vai adicionar dois produtos no carrinho e depois verificar se estão corretamente inseridos e por fim, removê-los', () => {
        const produtos = Cypress.env("produtos");
        const produtoVisitado1 = produtos.find(produtos => produtos.id === 1);
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

        // Vai para a pagina do carrinho
        cy.get('[href="/view_cart"]')
            .first()
            .should('be.visible')
            .click();

        // Verifica se os valores dentro do carrinho estão de acordo com o esperado
        cy.get('[class="table-responsive cart_info"]')
            .should('be.visible')
            .and('contain', produtoVisitado1.titulo);
        // Verifica o carrinho para cada produto
        cy.verificaDadosQuantitativosCarrinho(produtoVisitado1.id, produtoVisitado1.quantidade, produtoVisitado1.preco);

        // Verifica o texto de que o carrinho está vazio
        cy.get('[class="fa fa-times"]').should('be.visible').click();
        cy.wait(5000);
        cy.get('[class="text-center"]').contains('Cart is empty!').should('be.visible');
    });
});
