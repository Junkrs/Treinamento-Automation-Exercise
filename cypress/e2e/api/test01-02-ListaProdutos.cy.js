// O status da requisição vem por padrão 200, apesar de o responseCode vir diferente
describe('Teste 1 e 2 - API da lista de produtos', () => {
    // Primeiro chama a lista com todos os produtos
    it('Vai puxar a API que contém a lista de todos os produtos', () => {
        cy.api_chamarTodosProdutos().then(resposta => {
            // Como o body do endpoint vem vazio, o campo response é parseado para podermos manipular os dados internos
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
        });
    });

    // Depois vai tentar usar o método POST na lista de produtos
    it('Vai postar na API da lista de todos os produtos', () => {
        cy.api_postarTodosProdutos().then(resposta => {
            // Como o body do endpoint vem vazio, o campo response é parseado para podermos manipular os dados internos
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(405);
            expect(parsedResposta.message).to.eq('This request method is not supported.');
        });
    });
});
