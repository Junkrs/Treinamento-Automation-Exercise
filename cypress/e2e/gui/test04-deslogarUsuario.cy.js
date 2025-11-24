describe('Teste 4 - Deslogar usuário com email e senha', () => {
    const user = Cypress.env('user');

    before(() => {
        // Registra o usuário para fazer o teste em seguida
        cy.api_criarConta(user).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(201);
            expect(parsedResposta.message).to.eq('User created!');
        });
    });

    after(() => {
        // Remover o usuário para próximos testes
        cy.api_deletarConta(user.email_usuario, user.senha).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
            expect(parsedResposta.message).to.eq('Account deleted!');
        });
    });

    it('Cadastra o usuário, desloga, loga de forma e remove o usuário depois', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();

        // Logar o usuário com informações corretas
        cy.get('[data-qa="login-email"]').should('be.visible').type(user.email_usuario);
        cy.get('[data-qa="login-password"]').should('be.visible').type(user.senha);

        // Aperta o botão para fazer o login
        cy.get('[data-qa="login-button"]').should('be.visible').click();

        // Deslogar usuário corretamente
        cy.deslogarUsuario();

        // Loga o usuário com informações corretas
        cy.logarUsuario(user);
    });
});
