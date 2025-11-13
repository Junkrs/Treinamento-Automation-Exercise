describe('Teste 5 e 6 - API de pesquisar produto', () => {
    // Primeiro pesquisa um produto via API
    const item = 'top'; // Item que deve ser pesquisado
    it('Vai pesquisar um produto via API', () => {
        cy.api_pesquisarProduto(item).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
        });
    });

    // Depois vai tentar usar o método POST na lista de produtos
    it('Vai pesquisar um produto sem o termo de pesquisa, via API', () => {
        cy.api_pesquisarProdutoSemTermo(item).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(400);
            expect(parsedResposta.message).to.eq('Bad request, search_product parameter is missing in POST request.');
        });
    });
});
