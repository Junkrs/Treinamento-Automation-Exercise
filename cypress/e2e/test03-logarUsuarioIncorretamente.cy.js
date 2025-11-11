describe('Teste 3 - Logar usuário com email e senha incorretos', () => {
    const user = Cypress.env("user");
    it('Cadastra o usuário, desloga, loga de forma incorreta e verifica o erro', () => {
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

        // Logar o usuário com informações incorretas
        cy.logarUsuario('email.incorreto@mail.com', 'senhaincorreta123');

        // Verifica se existe a mensagem de erro na página
        cy.get('[class="login-form"]').contains('Your email or password is incorrect!').should('be.visible');

        // Logar usuário corretamente
        cy.logarUsuario(user.email_usuario, user.senha);

        // Deleta esse usuário de teste
        cy.removerUsuario();
    });
});
