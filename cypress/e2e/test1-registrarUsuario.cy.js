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

describe('Teste 1 - Registra o usuário', () => {
  it('Verifica se o site está visível e faz o registro e remoção do usuário', () => {
    cy.visit('http://automationexercise.com');

    // Verifica se o header e o footer estão visíveis
    cy.get('[id="header"]').should('be.visible');
    cy.get('[id="footer"]').should('be.visible');

    // Entra na página de login
    cy.get('[href="/login"]').should('be.visible').click();

    // Chama a função que registra o usuário
    // Coisa mais feia que eu ja fiz
    cy.registrarUsuarioCompleto(usuario, email_usuario, senha, nome, sobrenome, empresa, endereco, pais, estado, cidade, cep, celular);
    
    // Remover o usuário para próximos testes
    cy.removerUsuario();
  });
});
