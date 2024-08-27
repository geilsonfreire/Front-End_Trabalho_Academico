// Import Bibliotecas 
const sequelize = require('../config/db');

// Import models e componentes
const LotofacilAllResults = require('../models/LotofacilAllResult');
const Premiacoes = require('../models/Premiacoes');
const LocalGanhadores = require('../models/LocalGanhadores');
const EstadosPremiados = require('../models/EstadosPremiados');
const Dezenas = require('../models/Dezenas');
const Trevos = require('../models/Trevos');
const APIService = require('../server/APIService');

// Função para buscar e salvar todos os resultados
const fetchAndSaveAll = async () => {
    try {
        console.log('Iniciando a sincronização de todos os resultados da Lotofácil...');

        // Busca todos os resultados da Lotofácil
        const response = await APIService.getLotofacil();
        const allResults = response.data;

        // Certifique-se de que allResults é um array
        if (!Array.isArray(allResults)) {
            throw new Error('Os dados retornados pela API não são um array.');
        }

        for (const data of allResults) {
            console.log('Dados recebidos:', data);

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
        }
    } catch (error) {
        console.error('Erro ao sincronizar os dados:', error);
        throw new Error('Erro ao sincronizar os dados: ' + error.message);
    }
};

// Autenticação e sincronização com o banco de dados
sequelize.authenticate()
    .then(async () => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        // Verifica se a tabela LotofacilAllResults já contém dados
        const existingRecords = await LotofacilAllResults.count();
        if (existingRecords === 0) {
            // Se não houver registros, sincronize todos os resultados
            await fetchAndSaveAll();
        } else {
            console.log('Os dados já foram sincronizados anteriormente. Nenhuma ação necessária.');
        }
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = fetchAndSaveAll;