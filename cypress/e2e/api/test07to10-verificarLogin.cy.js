describe('Testes 7 ao 10 - API de verificar login', () => {
    const user = Cypress.env('user');
    beforeEach(() => {
        cy.visit('http://automationexercise.com');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();
        cy.registrarUsuarioCompleto(user);
    });

    after(() => {
        cy.visit('http://automationexercise.com');
        cy.removerUsuario();
    });

    //  Verificar os logins com as informações válidas que foram usadas anteriormente
    it('Vai verificar o login com dados corretos', () => {
        cy.api_verificarLogin(user.email_usuario, user.senha).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(200);
            expect(parsedResposta.message).to.eq('User exists!');
        });
    });

    // Depois vai verificar o login com o campo do email faltando
    it('Vai verificar o login com dados faltantes na requisição', () => {
        cy.api_verificarLoginIncorreto(user.senha).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(400);
            expect(parsedResposta.message).to.eq('Bad request, email or password parameter is missing in POST request.');
        });
    });

    // Após isso, vai tentar usar o método delete na API de login
    it('Vai tentar usar o método DELETED no login', () => {
        cy.api_verificarLoginDelete(user.email_usuario, user.senha).then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(405);
            expect(parsedResposta.message).to.eq('This request method is not supported.');
        });
    });

    // Por fim, vai verificar o login com dados inválidos
    it('Vai verificar o login com dados incorretos de usuário', () => {
        cy.api_verificarLogin('emailincorreto@mail.com', 'senhaincorreta123').then(resposta => {
            const parsedResposta = JSON.parse(resposta.body);
            expect(parsedResposta.responseCode).to.eq(404);
            expect(parsedResposta.message).to.eq('User not found!');
        });
    });
});
