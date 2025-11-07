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
} from '../../cypress.env.json'

describe('Teste 4 - Deslogar usuário com email e senha', () => {
  it('Cadastra o usuário, desloga, loga de forma e remove o usuário depois', () => {
    cy.visit('http://automationexercise.com')

    // Verifica se o header e o footer estão visíveis
    cy.get('[id="header"]').should('be.visible')
    cy.get('[id="footer"]').should('be.visible')

    // Entra na página de login
    cy.get('[href="/login"]').should('be.visible').click()

    // Registra o usuário para fazer o teste de login em seguida
    cy.registrarUsuarioCompleto(usuario, email_usuario, senha, nome, sobrenome, empresa, endereco, pais, estado, cidade, cep, celular)

    // Entra na página de login
    cy.get('[href="/logout"]').should('be.visible').click()

    // Logar o usuário com informações corretas
    cy.get('[data-qa="login-email"]').should('be.visible').type(email_usuario)
    cy.get('[data-qa="login-password"]').should('be.visible').type(senha)

    // Aperta o botão para fazer o login
    cy.get('[data-qa="login-button"]').should('be.visible').click()

    // Logar usuário corretamente
    cy.deslogarUsuario()

    // Loga o usuário com informações corretas e depois remover a conta
    cy.logarUsuario(email_usuario, senha)
    cy.removerUsuario()
  })
})
