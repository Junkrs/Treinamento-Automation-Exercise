describe('Teste 2 - Logar o usuário com email e senha corretos', () => {
    const user = Cypress.env('user');
    it('Cadastra o usuário, desloga, loga e depois deleta o registro', () => {
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
        cy.get('[data-qa="login-email"]').should('be.visible').type(user.email_usuario);
        cy.get('[data-qa="login-password"]').should('be.visible').type(user.senha);

        // Aperta o botão para fazer o login
        cy.get('[data-qa="login-button"]').should('be.visible').click();

        // Deleta esse usuário de teste
        cy.removerUsuario();
    });
});
