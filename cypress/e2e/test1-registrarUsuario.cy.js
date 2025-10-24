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
  celular
} from '../../cypress.env.json';

describe('Entre e faz o registro do usuário', () => {
  it('Verifica se o site está visível', () => {
    cy.visit('http://automationexercise.com');

    // Verifica se o header e o footer estão visíveis
    cy.get('[id="header"]').should('be.visible');
    cy.get('[id="footer"]').should('be.visible');

    // Entra na página de login
    cy.get('[href="/login"]').should('be.visible').click();

    // Chama a função que registra o usuário
    // Coisa mais feia que eu ja fiz
    cy.registrarUsuarioCompleto(usuario, email_usuario, senha, nome, sobrenome, empresa, endereco, pais, estado, cidade, cep, celular);
    
    // Verifica o texto de criação do usuário
    cy.get('[data-qa="account-created"]').should('be.visible');

    // Clica no botão de continuar após a verificação da tela
    cy.get('[data-qa="continue-button"]').should('be.visible').click();

    // Verifica se a label com o nome do usuário e se ela está visível e correta
    cy.get('[class="nav navbar-nav"]').should('be.visible').contains(`${usuario}`);

    // Deleta esse usuário de teste
    cy.get('[href="/delete_account"]').should('be.visible').click();

    // Verifica que a conta foi deletada
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').should('be.visible').click();
  });
});
