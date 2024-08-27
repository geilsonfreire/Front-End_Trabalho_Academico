## Dependencias do projeto

express: Framework web para Node.js.
sequelize: ORM para gerenciar o banco de dados.
mysql2: Driver para conectar ao MySQL.
dotenv: Para carregar variáveis de ambiente a partir de um arquivo .env.
nodemon: Para reiniciar automaticamente o servidor ao fazer alterações (em desenvolvimento).
Node-cron: Agendamento de requisições Para automatizar a requisição para ser feita uma vez por dia, você pode utilizar uma biblioteca como node-cron ou cron.

## Metodos para criar db pelo sequelize 
1º - npx sequelize db:create

## Criar Migrações: Para criar tabelas e outras estruturas no banco de dados, use o comando para gerar uma nova migração:
npx sequelize-cli migration:create --name tabela


## Executar Migrações: Depois de definir as migrações, aplique-as ao banco de dados:
-- As tabelas devem ser migradas em ordem 
1 - tabela concursos
2 - tabela premiacoes
3 - tabela local_ganhadores
4 - tabela lotofacilAllResult
npx sequelize-cli db:migrate --name 20240814225539-concursos

## Criar Seeders: Se precisar popular o banco de dados com dados iniciais, você pode criar seeders:
npx sequelize seed:generate --name seed-name

## Executar Seeders: Aplique os seeders para inserir dados iniciais no banco:
npx sequelize db:seed:all


## Video youtube 
CRUD com Node.JS e Sequelize PARTE 1 | Criando Estrutura de pastas e conexão com banco de dados.
https://www.youtube.com/watch?v=bnGKctadkuw&t=536s


## Relacionamentos entre tabelas 
Aqui está um resumo dos relacionamentos e propósitos das tabelas:

### Tabela LotofacilAllResult:
Propósito: Armazenar todos os resultados da Lotofácil.
Relacionamento:
concursoId: Referencia a tabela concursos, indicando a qual concurso o resultado pertence.

### Tabela concursos:
Propósito: Armazenar informações sobre cada concurso da Lotofácil, como o número do concurso e a data do sorteio.
Relacionamento:
id: Usado como chave primária e referenciado pelas tabelas LotofacilAllResult, premiacoes, e local_ganhadores.

### Tabela premiacoes:
Propósito: Armazenar informações sobre as premiações de cada concurso, incluindo o tipo de prêmio, a quantidade de ganhadores e o valor do prêmio.

### Relacionamento:
concursoId: Referencia a tabela concursos, associando cada premiação a um concurso específico.
Tabela local_ganhadores:
Propósito: Armazenar informações sobre os locais (cidades e estados) onde os ganhadores dos concursos estão localizados.

### Relacionamento:
concursoId: Referencia a tabela concursos, indicando a qual concurso os locais de ganhadores pertencem.
Resumo dos Relacionamentos:

### LotofacilAllResult ↔ concursos:

concursoId na tabela LotofacilAllResult é uma chave estrangeira que referencia id na tabela concursos.
premiacoes ↔ concursos:

concursoId na tabela premiacoes é uma chave estrangeira que referencia id na tabela concursos.
local_ganhadores ↔ concursos:

concursoId na tabela local_ganhadores é uma chave estrangeira que referencia id na tabela concursos.

