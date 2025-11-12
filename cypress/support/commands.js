// Arquivos de comandos custom

// Registrar um usuario
Cypress.Commands.add('registrarUsuarioCompleto', (user) => {
    // Pega os valores salvos dentro do objeto user
    const {
        usuario,
        email_usuario,
        senha,
        nome,
        sobrenome,
        empresa,
        endereco,
        pais,
        estado,
        cidade,
        cep,
        celular
    } = user;
    
    // Verifica o campo do nome e digita
    cy.get('[data-qa="signup-name"]')
        .should('be.visible')
        .type(usuario);

    // Verifica o campo do email e digita
    cy.get('[data-qa="signup-email"]')
        .should('be.visible')
        .type(email_usuario);
    // Aperta o botão de signup
    cy.get('[data-qa="signup-button"]')
        .should('be.visible')
        .click();
    // Verifica se o usuário já não está logado
    cy.get('body').then(($body) => {
    // Verifica se o elemento existe
        if ($body.find('[style="color: red;"]').length > 0) {
            // Verifica a existência do texto
            cy.get('[style="color: red;"]').then(($el) => {
                if ($el.text().includes('Email Address already exist!')) {
                    cy.logarUsuario(user);
                }
            });
        } else {
            // Completa os dados de cadastro:
            cy.get('[class="radio-inline"]') // Genero
                .should('be.visible')
                .contains('Mr.')
                .click();
            cy.get('[data-qa="password"]') // Senha
                .should('be.visible')
                .type(senha);
            // Data de nascimento
            cy.get('[data-qa="days"]')
                .should('be.visible')
                .select('15');
            cy.get('[data-qa="months"]')
                .should('be.visible')
                .select('October');
            cy.get('[data-qa="years"]')
                .should('be.visible')
                .select('1902');
            // Opções de receber emails e novidades
            cy.get('[class="checkbox"]')
                .contains('Sign up for our newsletter!')
                .should('be.visible')
                .click();
            cy.get('[class="checkbox"]')
                .contains('Receive special offers from our partners!')
                .should('be.visible')
                .click();

            // Completa os dados de endereço
            cy.get('[data-qa="first_name"]')
                .should('be.visible')
                .type(nome);
            cy.get('[data-qa="last_name"]')
                .should('be.visible')
                .type(sobrenome);
            cy.get('[data-qa="company"]')
                .should('be.visible')
                .type(empresa);
            cy.get('[data-qa="address"]')
                .should('be.visible')
                .type(endereco);
            cy.get('[data-qa="country"]')
                .should('be.visible')
                .select(pais);
            cy.get('[data-qa="state"]')
                .should('be.visible')
                .type(estado);
            cy.get('[data-qa="city"]')
                .should('be.visible')
                .type(cidade);
            cy.get('[data-qa="zipcode"]')
                .should('be.visible')
                .type(cep);
            cy.get('[data-qa="mobile_number"]')
                .should('be.visible')
                .type(celular);

            // Aperta o botão para concluir o cadastro
            cy.get('[data-qa="create-account"]')
                .should('be.visible')
                .click();

            // Verifica o texto de criação do usuário
            cy.get('[data-qa="account-created"]').should('be.visible');

            // Clica no botão de continuar após a verificação da tela
            cy.get('[data-qa="continue-button"]').should('be.visible').click();
        }
    });
    // Verifica se a label com o nome do usuário e se ela está visível e correta
    cy.get('[class="nav navbar-nav"]').should('be.visible').contains(`${usuario}`);
});

// Remove um usuário
Cypress.Commands.add('removerUsuario', () => {
    // Deleta esse usuário de teste
    cy.get('[href="/delete_account"]').should('be.visible').click();

    // Verifica que a conta foi deletada
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
});

// Loga com um usuário
Cypress.Commands.add('logarUsuario', (user) => {
    const {
        email_usuario,
        senha,
    } = user;
    // Colocar os dados de acesso para login do usuario previamente cadastrado
    cy.get('[data-qa="login-email"]').should('be.visible').clear().type(email_usuario);
    cy.get('[data-qa="login-password"]').should('be.visible').clear().type(senha);

    // Aperta o botão para fazer o login
    cy.get('[data-qa="login-button"]').should('be.visible').click();
});

// Desloga com um usuário
Cypress.Commands.add('deslogarUsuario', () => {
    cy.get('[href="/logout"]').should('be.visible').click();
});

// Adiciona um produto no carrinho
Cypress.Commands.add('adicionarNoCarrinho', (id, quantidade) => {
    cy.get(`[href="/product_details/${id}"]`).click();

    // Seleciona a quantidade que ele quer
    cy.get('[id="quantity"]')
        .should('be.visible')
        .click()
        .clear()
        .type(quantidade);

    // Adiciona o produto no carrinho
    cy.get('[class="btn btn-default cart"]').should('be.visible').click();

    // Fecha o popup de que avisa sobre o pedido ter sido enviado ao carrinho
    cy.get('[class="btn btn-success close-modal btn-block"]')
        .should('be.visible')
        .contains('Continue Shopping')
        .click();

    // Volta para a pagina do carrinho
    cy.get('[href="/products"]')
        .first()
        .should('be.visible')
        .click();
});

// Adiciona um produto no carrinho
Cypress.Commands.add('verificaDadosQuantitativosCarrinho', (id, quantidade, preco) => {
    cy.get(`[id="product-${id}"]`)
        .should('be.visible')
        .within(() => {
            // Verifica os quantitativos do carrinho em cada um dos produtos
            cy.get('[class="cart_quantity"]').should('be.visible').contains(quantidade);
            cy.get('[class="cart_price"]').should('be.visible').contains(preco);
            cy.get('[class="cart_total"]').should('be.visible').contains(preco * quantidade);
        });
});

// Verificar se os dados de entrega estão corretos
Cypress.Commands.add('verificaDadosDeEntrega', (user) => {
    const {
        usuario, 
        empresa, 
        endereco, 
        cidade, 
        estado, 
        cep, 
        celular
    } = user;
    cy.get('[id="address_delivery"]')
        .should('be.visible')
        .within(() => {
            cy.get('[class="address_firstname address_lastname"]').should('be.visible').contains(`Mr. ${usuario}`);
            cy.get('[class="address_address1 address_address2"]').should('be.visible').contains(empresa);
            cy.get('[class="address_address1 address_address2"]').should('be.visible').contains(endereco);
            cy.get('[class="address_city address_state_name address_postcode"]').should('be.visible').contains(`${cidade} ${estado} ${cep}`);
            cy.get('[class="address_phone"]').should('be.visible').contains(celular);
        });
});

// Verificar se os dados de cobranca estão corretos
Cypress.Commands.add('verificaDadosDeCobranca', (user) => {
    const {
        usuario, 
        empresa, 
        endereco, 
        cidade, 
        estado, 
        cep, 
        celular
    } = user;
    cy.get('[id="address_invoice"]')
        .should('be.visible')
        .within(() => {
            cy.get('[class="address_firstname address_lastname"]').should('be.visible').contains(`Mr. ${usuario}`);
            cy.get('[class="address_address1 address_address2"]').should('be.visible').contains(empresa);
            cy.get('[class="address_address1 address_address2"]').should('be.visible').contains(endereco);
            cy.get('[class="address_city address_state_name address_postcode"]').should('be.visible').contains(`${cidade} ${estado} ${cep}`);
            cy.get('[class="address_phone"]').should('be.visible').contains(celular);
        });
});

// Insere os dados do cartão do usuário
Cypress.Commands.add('colocarDadosCartão', (user, numCartao, codigoSeguranca) => {
    const {
        usuario, 
    } = user;
    cy.get('[data-qa="name-on-card"]').should('be.visible').clear().type(usuario);
    cy.get('[data-qa="card-number"]').should('be.visible').clear().type(numCartao);
    cy.get('[data-qa="cvc"]').should('be.visible').clear().type(codigoSeguranca);
    cy.get('[data-qa="expiry-month"]').should('be.visible').clear().type('12/26');
    cy.get('[data-qa="expiry-year"]').should('be.visible').clear().type('2026');

    // Aperta o botão
    cy.get('[data-qa="pay-button"]').should('be.visible').click();
});
