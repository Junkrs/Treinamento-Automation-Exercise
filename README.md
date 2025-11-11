# Treinamento Automation Exercise ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

Este repositório contém todos os exercícios que fiz com base nos casos de teste do site Automation Exercise, código desenvolvido em JavaScript no Cypress.
> [!NOTE]
> O site [Automation Exercise](https://automationexercise.com/) é uma página _web_ dedicada ao treinamento e resolução de exercícios para profissionais de QA. Ele foi feito pensando para a prática de automação, em todos os níveis. Contendo inclusive, uma [lista com casos de teste](https://automationexercise.com/test_cases) que são os que eu segui para a minha resolução.

## 🔳 Como usar:

Seguindo os passos abaixo, você pode instalar e executar os testes automatizados em Cypress que foram realizados até o momento.

### 🔳 Pré-requisitos
Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão >= 18.x recomendada);
- npm ou yarn;
- Git;

Tendo os pré-requisitos garantidos, basta seguir os próximos passos:

- Clonar o repositório:
  ```
  git clone https://github.com/Junkrs/Treinamento-Automation-Exercise
  ```

- Instale as dependências:
  ```
  npm install
  ```

- Execute o Cypress
  ```
  npx cypress open
  ```

### 🔳 Estrutura
Esta é a estrutura padrão do repositório, as marcadas em '#' não virão com o comando 'git clone ...':
```
Treinamento-Automation-Exercise/
├── cypress/
│   ├── e2e/                
│   ├── fixtures/           
│   └── support/
├── #node_modules
├── .gitignore          
├── cypress.config.js
├── #cypress.env.json  
├── package-lock.json   
├── package.json            
└── README.md
```

> [!IMPORTANT]
> Abaixo segue um exemplo de como você pode completar o seu arquivo .ENV sem que hajam problemas de compatibilidade com o código postado aqui.

```
{
    "usuario": "Dino da Silva Sauro",
    "senha": "senha123",
    "email_usuario": "dino.sauro@wesayso.com",
    "nome": "Dino",
    "sobrenome": "da Silva Sauro",
    "empresa": "WeSaySo",
    "endereco": "Rua das Samambaias, Nº 200",
    "pais": "New Zealand",
    "estado": "Distrito dos Répteis",
    "cidade": "Pangea Central",
    "cep": "00000-PA",
    "celular": "(12) 99123-4321"

    "produtos": [
        {
            "id": 1,
            "titulo": "Blue Top",
            "categoria": "Category: Women > Tops",
            "preco": 500,
            "disponibilidade": " In Stock",
            "condicao": " New",
            "marca": " Polo",
            "quantidade": 5
        },
        {
            "id": 2,
            "titulo": "Men Tshirt",
            "categoria": "Category: Men > Tshirts",
            "preco": 400,
            "disponibilidade": "In Stock",
            "condicao": "New",
            "marca": "H&M",
            "quantidade": 3
        },
        {
            "id": 5,
            "titulo": "Winter Top",
            "categoria": "Category: Women > Tops",
            "preco": 600,
            "disponibilidade": "In Stock",
            "condicao": "New",
            "marca": "Mast & Harbour",
            "quantidade": 1
        }
    ]
}
```

### 🔳 Considerações
Se tiver alguma dúvida. Por favor, entre em contato comigo :D

Email: junqueiragvl@gmail.com
Obrigado!
