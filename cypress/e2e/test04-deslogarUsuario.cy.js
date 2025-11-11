describe('Teste 4 - Deslogar usuário com email e senha', () => {
    const user = Cypress.env("user");
    it('Cadastra o usuário, desloga, loga de forma e remove o usuário depois', () => {
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

        // Logar o usuário com informações corretas
        cy.get('[data-qa="login-email"]').should('be.visible').type(user.email_usuario);
        cy.get('[data-qa="login-password"]').should('be.visible').type(user.senha);

        // Aperta o botão para fazer o login
        cy.get('[data-qa="login-button"]').should('be.visible').click();

        // Logar usuário corretamente
        cy.deslogarUsuario();

        // Loga o usuário com informações corretas e depois remover a conta
        cy.logarUsuario(user.email_usuario, user.senha);
        cy.removerUsuario();
    });
});
