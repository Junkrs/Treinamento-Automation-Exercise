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

describe('Teste 14 - Fazer pedidos e então cadastrar um usuário', () => {
    it('Vai adicionar os produtos no carrinho e depois cadastrar o usuário', () => {
        const produtoVisitado1 = produtos.find(produtos => produtos.id === 1); // Alterar aqui o id caso queira outros produtos
        const produtoVisitado2 = produtos.find(produtos => produtos.id === 2);
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

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

        // Aperta o botão para logar ou cadastrar o usuário
        cy.get('[href="/login"]')
            .should('be.visible')
            .contains('Register / Login')
            .click();

        // Função de registro do usuário
        cy.registrarUsuarioCompleto(usuario, email_usuario, senha, nome, sobrenome, empresa, endereco, pais, estado, cidade, cep, celular);
        
        // Aperta o botão para acessar a página do carrinho
        cy.get('[href="/view_cart"]')
            .first()
            .should('be.visible')
            .click();
        
        // Aperta o botão para prosseguir com a compra
        cy.get('[class="btn btn-default check_out"]').should('be.visible').click();

        // Verifica se os dados de entrega estão corretos
        cy.verificaDadosDeEntrega(usuario, empresa, endereco, cidade, estado, cep, celular);
    });
});
