
describe('Teste 25 - Verificar o scroll up e down usando os botões de seta', () => {
    it('Desce toda a página, verifica seu conteúdo e depois sobe novamente usando o botão', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Scrolla a página para baixo, até o final
        cy.scrollTo('bottom');

        // Verifica a aba de inscrição
        cy.get('[class="single-widget"]').should('be.visible').contains('Subscription');

        // Clica no botão que leva a tela para cima
        cy.wait(1500);
        cy.get('[id="scrollUp"]').should('be.visible').click();

        // Verifica se o texto de título da página esta visível
        cy.get('[class="col-sm-6"]').should('be.visible').contains('Full-Fledged practice website for Automation Engineers');
    });
});
