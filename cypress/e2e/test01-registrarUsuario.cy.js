describe('Teste 1 - Registra o usuário', () => {
    const user = Cypress.env("user");
    it('Verifica se o site está visível e faz o registro e remoção do usuário', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();

        // Chama a função que registra o usuário
        // Não está mais tão feio assim
        cy.registrarUsuarioCompleto(user);

        // Remover o usuário para próximos testes
        cy.removerUsuario();
    });
});
