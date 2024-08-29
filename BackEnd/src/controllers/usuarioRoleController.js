const { UsuarioRole } = require('../models');

exports.associateUsuarioRole = async (req, res) => {
    try {
        const { id_usuario, id_role } = req.params;
        const usuarioRole = await UsuarioRole.create({ id_usuario, id_role });
        res.status(201).json(usuarioRole);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRolesByUsuario = async (req, res) => {
    try {
        const roles = await UsuarioRole.findAll({
            where: { id_usuario: req.params.id_usuario },
        });
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUsuarioRole = async (req, res) => {
    try {
        const { id_usuario, id_role } = req.params;
        const usuarioRole = await UsuarioRole.findOne({
            where: { id_usuario, id_role },
        });
        if (usuarioRole) {
            await usuarioRole.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Relação de usuário e role não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};