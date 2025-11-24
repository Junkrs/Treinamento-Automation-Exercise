describe('Teste 1 - Registra o usuário', () => {
    const user = Cypress.env('user');

    after(() => {
        // Remover o usuário para próximos testes
        cy.api_deletarConta(user.email_usuario, user.senha).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
            expect(parsedResposta.message).to.eq('Account deleted!');
        });
    });

    it('Verifica se o site está visível e faz o registro e remoção do usuário', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();

        // Chama a função que registra o usuário
        cy.registrarUsuarioCompleto(user);
    });
});
