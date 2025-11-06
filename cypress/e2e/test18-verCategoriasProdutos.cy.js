describe('Teste 18 - Visitar uma categoria', () => {
    it('Vai entrar e verificar duas categorias diferentes na loja', () => {
        // Aqui vc pode mudar a url das categorias que quer testar
        const categoria1 = '/category_products/2'; // tops
        const categoria2 = '/category_products/3'; // tshirts 
        cy.visit('http://automationexercise.com');
        
        // Verifica se as categorias estão disponíveis no site e visita a feminina
        cy.get('[class="panel-group category-products"]')
            .should('be.visible')
            .contains('Women')
            .click();
        cy.get(`[href="${categoria1}"]`).should('be.visible').click();

        // Verifica se o site realmente levou o usuário para a categoria correta e o texto da página
        cy.url().should('eq', `https://automationexercise.com${categoria1}`);
        cy.get('[class="title text-center"]').contains('Women - Tops Products').should('be.visible');

        // Verifica se as categorias estão disponíveis no site e visita a feminina
        cy.get('[class="panel-group category-products"]')
            .should('be.visible')
            .contains('Men')
            .click();
        cy.get(`[href="${categoria2}"]`).should('be.visible').click();

        // Verifica se o site realmente levou o usuário para a categoria correta e o texto da página
        cy.url().should('eq', `https://automationexercise.com${categoria2}`);
        cy.get('[class="title text-center"]').contains('Men - Tshirts Products').should('be.visible');
    });
});
