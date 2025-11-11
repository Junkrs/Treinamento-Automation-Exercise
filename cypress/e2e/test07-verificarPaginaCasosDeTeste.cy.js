describe('Teste 7 - Visitar a verificar a página de casos de teste', () => {
    it('Verifica se o site está redirecionou o usuário para a página dos casos de teste', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de casos de teste usando o primeiro link disponível, neste caso, o da navbar
        cy.get('[href="/test_cases"]').first().should('be.visible').click();

        // Verifica se o site realmente direcionou o usuário para a página de testes
        cy.url().should('eq', 'https://automationexercise.com/test_cases');
    });
});
