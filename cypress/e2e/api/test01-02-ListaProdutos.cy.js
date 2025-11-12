describe('Teste 1 - Pega uma lista com todos os produtos', () => {
    // Primeiro chama a lista com todos os produtos
    it.only('Vai puxar a API que contém a lista de todos os produtos', () => {
        cy.api_chamarTodosProdutos().then(response => {
            expect(response.status).to.eq(200);
        });
    });

    // Depois vai tentar usar o método POST na lista de produtos
    it('Vai puxar a API que contém a lista de todos os produtos', () => {
        cy.api_postarTodosProdutos().then(response => {
            expect(response.body.responseCode).to.eq(405);
        });
    });
});
