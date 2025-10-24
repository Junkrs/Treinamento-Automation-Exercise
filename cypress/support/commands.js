// Arquivos de comandos custom

// Registrar um usuario
Cypress.Commands.add('registrarUsuarioCompleto', (usuario, email_usuario, senha, nome, sobrenome, empresa, endereco, pais, estado, cidade, cep, celular) => {
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
});
