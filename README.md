# Node.Js para o Aplicativo Financeiro em Angular - Back End

---

## Breve Descrição

---

Nesse Arquivo README.md, pretendo descrever o passo a passo da criação do Back End em Node.Js usando Prisma e Koa.
A intendeção é explicar o maximo possivel dos passos realizado para poder replicar no futuro, e também facilitar entender o que cada commint estao proponto quando for rever o codigo e assim ajudar na fixação do aprendizado.

COmo já explicamos no front end o que vai ser essa aplicativo, aqui vamos apenas direcionar os passos e commits, esse back end vaiser para armazenar as informaçãos e os ativos cadastrados dos usuarios para que o front possa gerar então relatorios conforme o usuario for utilizando o app.

---

### 1° Passo

1 - "npm init no terminal", enter em todas as opçoes sem adicionar nenhum dado.
Comando para iniciar um novo projeto Node.js e criar um arquivo package.json para gerenciar as dependências do projeto.

2 - "npm install -D typescript"
Comando para instalar o TypeScript como uma dependência de desenvolvimento. Isso significa que o TypeScript será instalado no seu projeto e adicionado ao seu arquivo package.json como uma dependência que só será usada durante o desenvolvimento.

3 - criar uma pasta "src" e o arquivo index.ts dentro.
src é uma pasta que você está criando para organizar seus arquivos de código-fonte, e index.ts é um arquivo TypeScript que você está criando dentro da pasta src. Esse arquivo conterá o código principal do seu aplicativo.

4 - "npm i nodemon" reinicializa o servidor automaticamente
Comando para instalar o Nodemon, que é uma ferramenta que reinicializa automaticamente o servidor sempre que o código é alterado. 

5 - "npm install prisma typescript ts-node @types/node --save-dev" // aparti daqui segundo a documentação do prisma com TS.
(https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)
Comando para instalar algumas dependências adicionais para trabalhar com o Prisma com TypeScript. Essas dependências incluem o Prisma (que é uma ferramenta de banco de dados), o TypeScript (que já foi instalado anteriormente), o ts-node (que é uma ferramenta para executar arquivos TypeScript diretamente no Node.js) e os tipos de node (que são as definições de tipo para as bibliotecas padrão do Node.js).

6 - "npx tsc --init"
npx tsc --init é um comando para gerar um arquivo de configuração tsconfig.json para o TypeScript. Este arquivo contém as configurações do compilador do TypeScript, como a versão do TypeScript a ser usada, as configurações de saída e as configurações de importação.

7 - "npx prisma"
Comando para verificar se o Prisma está instalado corretamente e se a configuração do banco de dados está correta.

8 - "npx prisma init"
Comando para inicializar um novo projeto do Prisma. Este comando criará um arquivo prisma/schema.prisma e uma pasta migrations para gerenciar as migrações do banco de dados.

Prisma: É uma biblioteca de banco de dados ORM (Object-Relational Mapping) que permite que os desenvolvedores interajam com bancos de dados relacionais de maneira mais fácil e intuitiva. Ele oferece uma maneira simples de escrever consultas SQL usando uma sintaxe mais amigável, além de oferecer recursos como validação de dados, geração de esquemas, migrações de banco de dados e muito mais.

### 1° Commit - Created Project using Terminal

***

### 2° Passo

Criando a conecção com mysql:
1 - mudar schema.prisma para mysql
2 - mudar e adicionar dados do banco mysql em .env // informativo simples de como fazer na doc do prisma.
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres

Add user model em "schema.prisma".
Add JWT_SECRET em ".env"

Migrar o banco com "npx prisma migrate dev --name init"
Conferir se comando criou banco e a tabela user no workbench.

### 2°Commit - Created DB using prisma.

***

### 3° Passo

Koa é um framework web para Node.js que foi criado para fornecer uma solução de middleware mais simples e expressiva em comparação com outros frameworks tradicionais, como o Express. Ele é baseado em conceitos como Promises, Generators e Async/Await, o que torna o código mais fácil de ler e entender.Ele pode ser uma boa opção se você precisa de uma solução de middleware mais enxuta e flexível em comparação com outros frameworks Node.js mais robustos e completos.

"npm install koa @koa/router"
Comando utiliza o Gerenciador de Pacotes Node (npm) para instalar dois pacotes: "koa" e "@koa/router".

"@koa/router" é um pacote que fornece um middleware(interemetidiário) de roteamento para o Koa. Ele permite que você defina rotas de URL e mapeie-as para funções específicas que lidam com as solicitações.

Em package.json
"start": "node src/index.ts",
"dev": "nodemon src/index.ts"

No arquivo index.ts:

1 - Importar as dependencias
const Koa = require('koa')
const Router = require ('@koa/router')

2 - Criar instancias
const app = new Koa()
const router = new Router()

3 - app.use(async (ctx: { body: string; }) => (ctx.body ="Hello World"));
Essa linha é responsável por definir uma rota no servidor Koa para a raiz do site ("/") e configurar uma função assíncrona que será executada sempre que uma solicitação for feita nessa rota. Essa função define o corpo da resposta como a string "Hello World".
- app: é uma instância do framework Koa criada no código para gerenciar o servidor web.
- .use: é um método do Koa usado para definir um middleware, que é uma função que será executada em cada solicitação HTTP recebida pelo servidor. Esse método recebe como parâmetro uma função que define o comportamento do middleware.
- async: é uma palavra-chave do JavaScript que define uma função assíncrona. Funções assíncronas são usadas para lidar com operações que levam algum tempo para serem concluídas, como solicitações HTTP, banco de dados e outras operações de I/O.
- (ctx: { body: string; }) =>: é uma função arrow que recebe um objeto de contexto ctx como parâmetro e define o comportamento do middleware. O objeto de contexto ctx contém informações sobre a solicitação HTTP recebida pelo servidor e a resposta que será enviada ao cliente.
- ctx.body: é uma propriedade do objeto de contexto ctx que representa o corpo da resposta HTTP que será enviada ao cliente. Nesse caso, estamos definindo o corpo da resposta como a string "Hello World".

4 - app.listen(3100, () => {
    console.log('Server running at: http://localhost:3100')
})
Esse comando de lista o servidor web koa na porta determinada e exibi no terminal uma msg no console de que o servidor ewstá funcionando.

## npm run dev
inicializar o servidor com nodemon

### 3° Commit - Install Koa and Hello world


