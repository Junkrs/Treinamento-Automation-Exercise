// O status da requisição vem por padrão 200, apesar de o responseCode vir diferente
describe('Teste 3 e 4 - API da lista de marcas', () => {
    // Primeiro chama a lista com todos as marcas
    it('Vai puxar a API que contém a lista de todos as marcas', () => {
        cy.api_chamarTodasMarcas().then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
        });
    });

    // Depois vai tentar usar o método POST na lista de marcas
    it('Vai postar na API da lista de todas as marcas', () => {
        cy.api_postarTodasMarcas().then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(405);
            expect(parsedResposta.message).to.eq('This request method is not supported.');
        });
    });
});
