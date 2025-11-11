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
import { faker } from '@faker-js/faker';

describe('Teste 15 - Vai cadastrar um usuário e fazer os pedidos', () => {
    it('Primeiro ocorre o cadastro do usuário e em seguida, os produtos serão pedidos', () => {
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

        // Verifica se os valores dentro do carrinho estão de acordo com o esperado
        cy.get('[class="table-responsive cart_info"]')
            .should('be.visible')
            .and('contain', produtoVisitado1.titulo)
            .and('contain', produtoVisitado2.titulo);
        // Verifica o carrinho para cada produto
        cy.verificaDadosQuantitativosCarrinho(produtoVisitado1.id, produtoVisitado1.quantidade, produtoVisitado1.preco);
        cy.verificaDadosQuantitativosCarrinho(produtoVisitado2.id, produtoVisitado2.quantidade, produtoVisitado2.preco);

        // Clica no botão de checkout para completar o pedido
        cy.get('[class="btn btn-default check_out"]').should('be.visible').click();

        // Verifica se os dados de entrega estão corretos
        cy.verificaDadosDeEntrega(usuario, empresa, endereco, cidade, estado, cep, celular);

        // Digita o texto de comentários sobre a compra
        cy.get('[class="form-control"]')
            .should('be.visible')
            .clear()
            .type(faker.lorem.words(20));

        // Aperta o botão para prosseguir
        cy.get('[class="btn btn-default check_out"]').should('be.visible').click();

        // Chama a função que processa o pagamento
        cy.colocarDadosCartão(usuario, faker.number.int(123456789101112), faker.number.int(999));

        // Finaliza o pedido
        cy.get('[data-qa="continue-button"]').should('be.visible').click();

        // Remove o usuário
        cy.removerUsuario();
    });
});
