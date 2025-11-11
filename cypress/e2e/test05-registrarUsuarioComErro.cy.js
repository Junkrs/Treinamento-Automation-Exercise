describe('Teste 5 - Registrar um novo usuário, deslogar e depois tentar logar com outro email', () => {
    const user = Cypress.env("user");
    it('Cadastra o usuário, desloga, loga, erra, e depois erra o registro', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();

        // Registra o usuário para fazer o teste de login em seguida
        cy.registrarUsuarioCompleto(user);

        // Entra na página de login
        cy.get('[href="/logout"]').should('be.visible').click();

        // Colocar os dados de acesso para login do usuario previamente cadastrado
        cy.get('[data-qa="login-email"]').should('be.visible').type('email.incorreto@mail.com');
        cy.get('[data-qa="login-password"]').should('be.visible').type(user.senha);

        // Aperta o botão para fazer o login e verifica a mensagem de erro
        cy.get('[data-qa="login-button"]').should('be.visible').click();
        cy.get('[class="login-form"]').contains('Your email or password is incorrect!').should('be.visible');

        // Deleta esse usuário de teste
        cy.logarUsuario(user.email_usuario, user.senha);
        cy.removerUsuario();
    });
});
