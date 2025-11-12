describe('Teste 10 - Deve verificar se o usuário está inscrito na página principal', () => {
    const user = Cypress.env('user');
    it('Digita o email e clica no botão', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Clica no campo do email, digita e aperta o botao
        cy.get('[id="susbscribe_email"]')
            .should('be.visible')
            .clear()
            .type(user.email_usuario);
        cy.get('[id="subscribe"]').should('be.visible').click();

        // Verifica a mensagem de confirmação
        cy.get('[class="alert-success alert"]')
            .should('be.visible')
            .contains('You have been successfully subscribed!');
    });
});
