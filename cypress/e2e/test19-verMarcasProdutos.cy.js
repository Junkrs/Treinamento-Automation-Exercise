describe('Teste 19 - Visitar uma marca', () => {
    it('Vai entrar e verificar duas marcas diferentes na loja', () => {
    // Aqui vc pode mudar a url das categorias que quer testar
        const marca1 = '/brand_products/Polo';
        const marca2 = '/brand_products/Biba';
        cy.visit('http://automationexercise.com');

        // Verifica se as categorias estão disponíveis no site e visita a feminina
        cy.get('[class="panel-group category-products"]')
            .should('be.visible')
            .contains('Women')
            .click();
        cy.get(`[href="${marca1}"]`).should('be.visible').click();

        // Verifica se o site realmente levou o usuário para a categoria correta e o texto da página
        cy.url().should('eq', `https://automationexercise.com${marca1}`);
        cy.get('[class="title text-center"]').contains('Brand - Polo Products').should('be.visible');

        // Verifica se as categorias estão disponíveis no site e visita a feminina
        cy.get('[class="panel-group category-products"]')
            .should('be.visible')
            .contains('Men')
            .click();
        cy.get(`[href="${marca2}"]`).should('be.visible').click();

        // Verifica se o site realmente levou o usuário para a categoria correta e o texto da página
        cy.url().should('eq', `https://automationexercise.com${marca2}`);
        cy.get('[class="title text-center"]').contains('Brand - Biba Products').should('be.visible');
    });
});
