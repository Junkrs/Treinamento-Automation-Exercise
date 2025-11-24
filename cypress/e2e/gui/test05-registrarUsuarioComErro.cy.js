describe('Teste 5 - Registrar um novo usuário, deslogar e depois tentar logar com outro email', () => {
    const user = Cypress.env('user');

    before(() => {
        cy.api_deletarConta(user.email_usuario, user.senha);
        // Registra o usuário para fazer o teste de login em seguida
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

    it('Cadastra o usuário, desloga, loga, erra, e depois erra o registro', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();

        // Colocar os dados de acesso para login do usuario previamente cadastrado
        cy.get('[data-qa="login-email"]').should('be.visible').type('email.incorreto@mail.com');
        cy.get('[data-qa="login-password"]').should('be.visible').type(user.senha);

        // Aperta o botão para fazer o login e verifica a mensagem de erro
        cy.get('[data-qa="login-button"]').should('be.visible').click();
        cy.get('[class="login-form"]').contains('Your email or password is incorrect!').should('be.visible');

        // Deleta esse usuário de teste
        cy.logarUsuario(user);
    });
});
