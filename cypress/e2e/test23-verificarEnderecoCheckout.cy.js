import {
    usuario,
    senha,
    email_usuario,
    nome,
    sobrenome,
    empresa,
    endereco,
    pais,
    estado,
    cidade,
    cep,
    celular,
    produtos
} from '../../cypress.env.json';

describe('Teste 23 - Vai verificar os detalhes do endereço e fazer o checkout', () => {
    it('Após o login, o usuário vai adicionar produtos no carrinho e verificar se os dados de endereço estão corretos no checkout', () => {
        const produtoVisitado1 = produtos.find(produtos => produtos.id === 1); // Alterar aqui o id caso queira outros produtos
        const produtoVisitado2 = produtos.find(produtos => produtos.id === 2);
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/login"]').should('be.visible').click();

        // Chama a função que registra o usuário
        cy.registrarUsuarioCompleto(usuario, email_usuario, senha, nome, sobrenome, empresa, endereco, pais, estado, cidade, cep, celular);

        // Vai para a pagina dos produtos
        cy.get('[href="/products"]')
            .first()
            .should('be.visible')
            .click();

        // Adiciona os produtos no carrinho, baseado na sua ID e na quantidade
        cy.get('[class="col-sm-4"]').eq(produtoVisitado1.id).should('be.visible');
        cy.adicionarNoCarrinho(produtoVisitado1.id, produtoVisitado1.quantidade);
        cy.get('[class="col-sm-4"]').eq(produtoVisitado2.id).should('be.visible');
        cy.adicionarNoCarrinho(produtoVisitado2.id, produtoVisitado2.quantidade);

        // Vai para a pagina do carrinho
        cy.get('[href="/view_cart"]')
            .first()
            .should('be.visible')
            .click();

        // Clica no botão de checkout para completar o pedido
        cy.get('[class="btn btn-default check_out"]').should('be.visible').click();

        // Verifica se os dados de entrega e cobrança estão corretos
        cy.verificaDadosDeEntrega(usuario, empresa, endereco, cidade, estado, cep, celular);
        cy.verificaDadosDeCobranca(usuario, empresa, endereco, cidade, estado, cep, celular);

        // Remove o usuário
        cy.removerUsuario();
    });
});
