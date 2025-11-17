describe('Testes 11 ao 14 - APIs de verificar detalhes da conta', () => {
    const user = Cypress.env('user');
    beforeEach(() => {
        cy.api_deletarConta(user.email_usuario, user.senha);
    });
    //  Vai criar uma conta de usuario via API
    it('Vai criar a conta de usuário via API', () => {
        cy.api_criarConta(user).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(201);
            expect(parsedResposta.message).to.eq('User created!');
        });
    });

    // Depois vai deletar a conta do usuário
    it('Vai deletar uma conta de usuário via API', () => {
        cy.api_criarConta(user);
        cy.api_deletarConta(user.email_usuario, user.senha).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
            expect(parsedResposta.message).to.eq('Account deleted!');
        });
    });

    // Após isso, vai atualizar a conta de um usuário
    it('Vai atualizar os dados do usuário via API', () => {
        cy.api_criarConta(user);
        cy.api_atualizarConta(user).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
            expect(parsedResposta.message).to.eq('User updated!');
        });
    });

    // Por fim, vai retornar todos os dados válidos do usuário pelo email
    it('Vai retornar os dados vinculados à um email, via API', () => {
        cy.api_criarConta(user);
        cy.api_puxarDadosEmail(user.email_usuario).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
        });
    });
});
