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

// Realizando associações
Produto.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });
Produto.hasOne(Estoque, { foreignKey: 'id_produto', as: 'estoque' });
Produto.hasMany(MovimentacaoEstoque, { foreignKey: 'id_produto', as: 'movimentacoes' });

Categoria.hasMany(Produto, { foreignKey: 'id_categoria', as: 'produtos' });
Estoque.belongsTo(Produto, { foreignKey: 'id_produto', as: 'produto' });
MovimentacaoEstoque.belongsTo(Produto, { foreignKey: 'id_produto', as: 'produto' });

// Exportando os modelos e a instância do Sequelize
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
