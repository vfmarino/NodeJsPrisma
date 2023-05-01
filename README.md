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

***

### 4° Passo

No arquivo schema.prisma adicionamos a variavel:
createdAt DateTime @default(now())
Para identificar quando a data de criação do cadastro.

criado os arquivos:
config.ts
logger.ts
protectedRoutes.ts
unprotectedRoutes.ts

criado pasta controller com:
user.ts
auth.ts

- config.ts:
O arquivo é utilizado para armazenar variáveis de ambiente e configurar algumas opções do projeto. Usado para armazenar informações sensíveis, como senhas de banco de dados ou chaves de API, sem expor essas informações diretamente no código.
Vamos usar, a função dotenv.config() para carregar as variáveis de ambiente a partir do arquivo .env e a interface Config para tipar as opções que serão configuradas. Em seguida, são definidas as opções padrão de configuração, que podem ser sobrescritas pelas variáveis de ambiente, caso elas existam.
Exemplo:

port: +(process.env.PORT || 3000)
O valor padrão para a porta é 3000, mas se a variável de ambiente PORT estiver definida, ela será usada em vez disso.


dotenv.config({ path: ".env" });: Carrega as variáveis de ambiente do arquivo .env no projeto.

debugLogging: boolean;: Define uma propriedade debugLogging do tipo boolean que indica se o modo de depuração está habilitado ou não.

dbsslconn: boolean;: Define uma propriedade dbsslconn do tipo boolean que indica se a conexão com o banco de dados deve ser feita por SSL ou não.

jwtSecret: string;: Define uma propriedade jwtSecret do tipo string que armazena a chave secreta para gerar e validar o token JWT.

databaseUrl: string;: Define uma propriedade databaseUrl do tipo string que armazena a URL de conexão com o banco de dados.

const isDevMode = process.env.NODE_ENV == "development";: Define uma variável isDevMode que verifica se a variável de ambiente NODE_ENV está definida como "development".

debugLogging: isDevMode,: Define a propriedade debugLogging da constante config com o valor da variável isDevMode.
dbsslconn: !isDevMode,: Define a propriedade dbsslconn da constante config com o valor negado da variável isDevMode.
A variável isDevMode é uma flag que é definida de acordo com o valor da variável de ambiente NODE_ENV. Quando a variável NODE_ENV está definida como "development", isDevMode recebe o valor booleano true, indicando que o servidor está em modo de desenvolvimento. Caso contrário, isDevMode recebe false, indicando que o servidor está em modo de produção.


export { config };: Exporta a constante config para ser utilizada em outros arquivos.

precisamos instalar pelo terminal dotenv:
"npm install dotenv --save"

- Agora iremos tratar os arquivos protectedRoutes.ts unprotectedRoutes.ts:

Esses arquivos definem quais rotas são protegidas ou não, neste momento incial vamos apenas deixar elas habilitadas com exemplos comentados para futuramente adaptar a necessidade da aplicação.

precisamos instalar pelo terminal
npm i --save-dev @types/koa__router

- logger.ts:
O middleware gerado por essa função permite que os logs das requisições do servidor sejam armazenados em arquivos e console, com níveis de log variáveis e formatos coloridos para ajudar a identificar problemas rapidamente durante o desenvolvimento ou produção.Este arquivo é importante para o registro de logs das requisições do cliente e pode ajudar no processo de depuração e monitoramento do aplicativo.

- Importado o objeto Context do Koa.js, que é usado para representar o contexto da requisição HTTP.
O Context é um objeto que contém informações sobre a requisição HTTP que o servidor recebeu, incluindo informações sobre a URL, método HTTP, cabeçalhos, corpo da mensagem, etc. Ele é fornecido pelo Koa para todos os middlewares que são executados durante o processamento da requisição e permite acessar e manipular essas informações da requisição, bem como definir informações de resposta.

- Importados os objetos transports e format do pacote winston, que é um framework de registro para Node.js.
Winston é usado para registrar a mensagem de log no formato especificado, no local (arquivo ou console) especificado e no nível especificado (com base no status da solicitação).

- Importado o módulo path do Node.js, que é usado para manipular caminhos de arquivos e direcionalos.

- Função logger que recebe um objeto winstonInstance como parâmetro.
- Configurado o objeto winstonInstance com o nível de registro a ser usado e os transportes a serem usados para armazenar os logs.
- Configurado os transportes que serão usados pelo winstonInstance. Neste caso, é usado um transporte para salvar logs de erro em um arquivo e um transporte para imprimir logs de nível de informação no console.

- Definido o middleware de registro que é retornado pela função logger. Este middleware recebe o contexto da requisição e uma função next que é chamada para continuar a execução da requisição.

- Depois é registrado o momento em que a requisição começa a ser processada.

- Chamado o próximo middleware na pilha e, se houver algum erro, o middleware captura o erro e define o status da resposta e o corpo da resposta de acordo com o erro.

- Registrado o momento em que a requisição é concluída e é calculado o tempo total de processamento da requisição.

- Definido o nível de log com base no status da resposta da requisição e é criada a mensagem de log que será registrada.

- Chamado o método log do objeto winstonInstance para registrar o log.

No terminal instalar winston:
npm i --save-dev @types/winston

e
npx prisma migrate dev --name init
para add no schema com a variavel de criação do momento em que o usario foi criado.

### 4° Commit - Created config.ts looger.ts route controll

***

### 5 Passo 

Vamos configurar index.ts 

Primeiro instalar os pacotes abaixo:
npm install koa-jwt
npm install koa-body
npm i koa-helmet
npm install @koa/cors
npm install koa-cors
npm i --save-dev @types/koa__cors
npm install reflect-metadata ( este não estava sendo declaro inicalmente causando crash em nodemon)

Foram adicionados Comentarios no arquivo explicando cada função declarada.

### 5° Commit - Defined new index.ts

***
### 6° Passo

npm install bcryptjs
npm i --save-dev @types/bcryptjs

Criando arquivo user.ts
Nesse arquivos definimos o "crud" para user
Cria, update, findById, findByEmail, Delete.

Criação de user ja funciona

Até aqui ainda nao tinha auth para gerar o JWT token e authorização e fazer o login
Criado essa função em auth.ts, login e logout

No arquivos protected e unprotedted routes estava dando conflito com rotas de mesmo nome, alteramos para evitar esse conflito e remover os erros.

### 6° Commit - CreateUser and Login Logout

***

### 7° Passo

Criando GetUserData em user.ts, adicionado rota em protectedRoutes
Primeiramente GetUserData, verifica se o token enviado no Header foi fornecido, senao objemos erro 401.
Extrai o token de autorização do cabeçalho. O cabeçalho é uma string que contém a palavra "Bearer" seguida do token. O split é usado para dividir a string em duas partes, ignorando a palavra "Bearer" e extraindo apenas o token.
Decodifica o token usando a chave secreta jwtSecret definida no arquivo de configuração config. A função verify retorna um objeto contendo os dados do token decodificado. Nesse caso, espera-se que o token contenha um objeto com a propriedade data contendo o ID do usuário como um número.
Busca os dados de acordo com ID encontrado retornando as propriedades especificadas em delete.
Se o usuario nao foi encontrado ele gera um Erro 404 com a messagem de usuario nao encontrado
Atribui o objeto do usuário encontrado à propriedade body do objeto ctx, que será enviado como resposta à requisição.(ctx.body = user)
Por ultimo caso tenha algum erro ele retorna 401 dizendo token invalido!

### 7° Commit GetUserData with JWTtoken

***

### 8 Passo

Primeiro Iremos criar o SCHEMA.primas para salvar as Coin atravez da API da coinMArketCAp

model CryptoPrice {
  id           Int      @id @default(autoincrement())
  coinMarketId Int
  name         String
  symbol       String
  price        Float
  timestamp    DateTime @default(now())
}

Vamos criar o modelo acima, é importante salvar o ID da CoinMarketCap, pois existem moedas com mesmo nome e também mesmo simbolo, sendo assim para evitar conflito será necessario usar o ID para indentificar as moedas.

npx prisma migrate dev

npm install axios

O axios possui uma sintaxe mais simples e uma API mais amigável para realizar requisições HTTP, além de suportar várias funcionalidades úteis, como a definição de configurações padrão, a interceptação de requisições e respostas, e o suporte a promessas para facilitar o tratamento de erros. simplifica bastante o processo de realizar requisições HTTP no Node.js, tornando o código mais legível e mais fácil de manter.

Criado Aqruivo cryptoPrices.ts
Faz a chamada na api da coinMarketCap, cria 2 loop
1 - para alternar a pagina por aparecem 100 moedas por paginas.
2 - interar e salvar os dados de cada moeda no banco de dados.
No final ele cria um setInterval para atualizar os valores a cada 5 minutos.
Dentro do Arquivo adicionamos alguns comentarios para facilitar o entendimento.

### 8° Commit Save CryptoPrices with CoinMarketCap API

***

### 9° Passo

Criamos um diagrama para relacionar as entidades, nesse momento vamos Criar e atualizar os Schemas.
Alteraçoes são realizado no schema.prima

A ideia é de que o cada usuario tenha um portifolio e um modo de assinatura, cada portifolio vai ter varias carteiras que pode ser de Criptomoedas, Ativos Br e Ativos Eua, 3 categorias de carteiras. Dentro de cada Carteira vai ter operaçoes de compra e venda de cada ativo para então gerar um relatorio e um dashboard do Portifolio e de cada carteira.

Schema.prisma Criado.

### 9° Commit Schema.prima models Atualized

***

### 10° Passo

