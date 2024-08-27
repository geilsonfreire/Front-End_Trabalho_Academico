const LotofacilAllResults = require('../models/LotofacilAllResult');
const Premiacoes = require('../models/Premiacoes');
const LocalGanhadores = require('../models/LocalGanhadores');
const EstadosPremiados = require('../models/EstadosPremiados');
const Dezenas = require('../models/Dezenas');
const Trevos = require('../models/Trevos');


const getLotofacilLatest = async (req, res) => {
    try {
        // Busca o último resultado da Lotofácil com base na data mais recente
        const latestResult = await LotofacilAllResults.findOne({
            include: [
                { model: Dezenas, as: 'dezenas' },
                { model: Premiacoes, as: 'premiacoes' },
                { model: LocalGanhadores, as: 'localGanhadores' },
                { model: EstadosPremiados, as: 'estadosPremiados' },
                { model: Trevos, as: 'trevos' }
            ],  
        });

        if (!latestResult) {
            return res.status(404).json({ message: 'Nenhum resultado encontrado.' });
        }

        return res.json(latestResult);
    } catch (error) {
        console.error('Erro ao buscar o último resultado:', error);
        return res.status(500).json({ message: 'Erro ao buscar o último resultado', error: error.message });
    }
};

module.exports = getLotofacilLatest;
