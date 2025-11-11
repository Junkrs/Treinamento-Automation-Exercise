import {
    email_usuario,
    nome,
} from '../../cypress.env.json';
import { faker } from '@faker-js/faker';

describe('Teste 6 - Preencher formulário do "fale conosco"', () => {
    it('Verifica se o site está visível e preenche o formulário', () => {
        cy.visit('http://automationexercise.com');

        // Verifica se o header e o footer estão visíveis
        cy.get('[id="header"]').should('be.visible');
        cy.get('[id="footer"]').should('be.visible');

        // Entra na página de login
        cy.get('[href="/contact_us"]').should('be.visible').click();

        // Verifica o texto 'GET IN TOUCH'
        cy.get('[class="title text-center"]').contains('Get In Touch').should('be.visible');

        // Completa os dados necessários para o formulário de contato:
        cy.get('[data-qa="name"]').should('be.visible').type(nome);
        cy.get('[data-qa="email"]').should('be.visible').type(email_usuario);
        cy.get('[data-qa="subject"]').should('be.visible').type(faker.lorem.words(3));
        cy.get('[data-qa="message"]').should('be.visible').type(faker.lorem.words(10));
        cy.get('input[type="file"]').should('be.visible').attachFile('arquivoTeste.txt');
        cy.wait(2500); // Coloquei esse wait apenas para verificar se tudo foi digitado mesmo

        // Aperta o botão de submit do formulário
        cy.get('[data-qa="submit-button"]').should('be.visible').click();

        // Aperta OK no popup de confirmação
        cy.on('window:alert', (botao) => {
            expect(botao).to.equal('OK').click();
        });

        // Verifica a mensagem de sucesso
        cy.get('[class="status alert alert-success"]').should('be.visible').contains('Success! Your details have been submitted successfully.');

        // Clica no botão para retornar a HOME
        cy.get('[class="btn btn-success"]').should('be.visible').contains(' Home').click();

        // Verifica se o site realmente retornou para a home
        cy.url().should('eq', 'https://automationexercise.com/');
    });
});
