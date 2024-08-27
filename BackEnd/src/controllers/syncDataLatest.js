// import Bibliotecas 
const sequelize = require('../config/db');
const cron = require('node-cron');


// Import models e componentes
const LotofacilAllResults = require('../models/LotofacilAllResult');
const Premiacoes = require('../models/Premiacoes');
const LocalGanhadores = require('../models/LocalGanhadores');
const EstadosPremiados = require('../models/EstadosPremiados');
const Dezenas = require('../models/Dezenas');
const Trevos = require('../models/Trevos');
const APIService = require('../server/APIService');


const fetchAndSaveLatest = async () => {
    try {
        // Obtém o último resultado da Lotofacil usando o APIService
        const response = await APIService.getLatest();
        const data = response.data;
        console.log('Dados recebidos:', data);

        // Verifica se o concurso já existe no banco de dados
        const existingRecord = await LotofacilAllResults.findOne({ where: { concurso: data.concurso } });
        if (existingRecord) {
            console.log(`Concurso ${data.concurso} já existe no banco de dados. Nenhuma ação necessária.`);
            return;
        }

        // Salva os dados principais na tabela LotofacilAllResults
        const lotofacilAllResult = await LotofacilAllResults.create({
            loteria: data.loteria,
            concurso: data.concurso,
            data: data.data,
            local: data.local,
            observacao: data.observacao || '',
            acumulou: data.acumulou,
            proximo_concurso: data.proximoConcurso,
            valor_arrecadado: data.valorArrecadado,
            valor_acumulado_concurso_0_5: data.valorAcumuladoConcurso_0_5,
            valor_acumulado_concurso_especial: data.valorAcumuladoConcursoEspecial,
            valor_acumulado_proximo_concurso: data.valorAcumuladoProximoConcurso,
            valor_estimado_proximo_concurso: data.valorEstimadoProximoConcurso,
        });
        console.log('Dados principais salvos com sucesso!');

        // Salva as dezenas na tabela Dezenas
        const dezenasData = data.dezenas.map((dezena, index) => ({
            dezenas_ordem_sorteio: index + 1,
            dezenas: dezena,
            lotofacil_all_result_id: lotofacilAllResult.id
        }));
        await Dezenas.bulkCreate(dezenasData);
        console.log('Dezenas salvas com sucesso!');

        // Salva as premiações na tabela Premiacoes
        const premiacoesData = data.premiacoes.map(premiacao => ({
            descricao: premiacao.descricao,
            faixa: premiacao.faixa,
            ganhadores: premiacao.ganhadores,
            valor_premio: premiacao.valorPremio,
            lotofacil_all_result_id: lotofacilAllResult.id
        }));
        await Premiacoes.bulkCreate(premiacoesData);
        console.log('Premiações salvas com sucesso!');

        // Salva os locais ganhadores na tabela LocalGanhadores
        const localGanhadoresData = data.localGanhadores.map(local => ({
            cidade: local.cidade,
            uf: local.uf,
            ganhadores: local.ganhadores,
            lotofacil_all_result_id: lotofacilAllResult.id
        }));
        await LocalGanhadores.bulkCreate(localGanhadoresData);
        console.log('Locais ganhadores salvos com sucesso!');

        // Salva os estados premiados na tabela EstadosPremiados
        const estadosPremiadosData = data.estadosPremiados.map(estado => ({
            estado: estado.estado,
            ganhadores: estado.ganhadores,
            lotofacil_all_result_id: lotofacilAllResult.id
        }));
        await EstadosPremiados.bulkCreate(estadosPremiadosData);
        console.log('Estados premiados salvos com sucesso!');

        // Salva os trevos na tabela Trevos, se houver
        if (data.trevos && data.trevos.length > 0) {
            const trevosData = data.trevos.map(trevo => ({
                trevo: trevo,
                lotofacil_all_result_id: lotofacilAllResult.id
            }));
            await Trevos.bulkCreate(trevosData);
            console.log('Trevos salvos com sucesso!');
        }

        // Após salvar os dados, registra a sincronização no SyncLog
        await SyncLog.create({ lastSync: moment().format('YYYY-MM-DD') });
        console.log('Sincronização registrada com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar os dados:', error);
        throw new Error('Erro ao sincronizar os dados: ' + error.message);
    }
};

// Função para verificar se já houve sincronização no dia atual
const checkAndSync = async () => {
    const today = moment().format('YYYY-MM-DD');
    const lastSync = await SyncLog.findOne({ where: { lastSync: today } });

    if (!lastSync) {
        console.log('Sincronização do dia ainda não foi feita. Iniciando...');
        await fetchAndSaveLatest();
    } else {
        console.log('Sincronização do dia já foi realizada.');
    }
};

// Agendamento para rodar todos os dias à meia-noite
cron.schedule('0 0 * * *', () => {
    console.log('Iniciando sincronização diária...');
    fetchAndSaveLatest(); // Chama a função para buscar e salvar os dados
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

// Autenticação e sincronização com o banco de dados
sequelize.authenticate()
    .then(async () => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await checkAndSync(); // Verifica e sincroniza se necessário
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

module.exports = fetchAndSaveLatest;