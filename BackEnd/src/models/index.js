const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se de que o caminho está correto

// Importando os modelos e passando as instâncias do Sequelize e DataTypes
const Categoria = require('./categoria')(sequelize, DataTypes);
const Produto = require('./produto')(sequelize, DataTypes);
const Estoque = require('./estoque')(sequelize, DataTypes);
const MovimentacaoEstoque = require('./movimentacaoEstoque')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);
const UsuarioRole = require('./usuarioRole')(sequelize, DataTypes);

// Realizando associações (se necessário)
// Exemplo: Produto.belongsTo(Categoria);

module.exports = {
    Categoria,
    Produto,
    Estoque,
    MovimentacaoEstoque,
    Usuario,
    Role,
    UsuarioRole,
    sequelize,  // Exportando a instância do sequelize para usar em outros arquivos se necessário
    Sequelize,  // Exportando o Sequelize caso precise em outro lugar
};
