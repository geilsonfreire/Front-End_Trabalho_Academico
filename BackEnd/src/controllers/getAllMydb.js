const LotofacilAllResults = require('../models/LotofacilAllResult'); 
const Premiacoes = require('../models/Premiacoes');
const LocalGanhadores = require('../models/LocalGanhadores');
const EstadosPremiados = require('../models/EstadosPremiados');
const Dezenas = require('../models/Dezenas');
const Trevos = require('../models/Trevos');

const getLotofacilAllMydb = async (req, res) => {
    try {
        // Busca todos os resultados da Lotofácil
        const results = await LotofacilAllResults.findAll({
            include: [
                { model: Dezenas, as: 'dezenas' },
                { model: Premiacoes, as: 'premiacoes' },
                { model: LocalGanhadores, as: 'localGanhadores' },
                { model: EstadosPremiados, as: 'estadosPremiados' },
                { model: Trevos, as: 'trevos' }
            ],
        });
        return res.json(results);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return res.status(500).json({ message: 'Erro ao buscar dados', error: error.message });
    }
};

module.exports = getLotofacilAllMydb;
