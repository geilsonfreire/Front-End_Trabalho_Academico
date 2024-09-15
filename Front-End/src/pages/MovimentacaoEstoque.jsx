// Importação de Bibliotecas

// Importação de CSS
import "../style/MovimentacaoEstoque.css";

const MovimentacaoEstoque = () => {

    return (
        <main className="MovimentacaoContainer">
            <section className="MovimentacaoForm">
                <h2>Registrar Movimentação de Estoque</h2>

                <form onSubmit={""}>

                    <div className="InputGroup">
                        <label htmlFor="produto">Produto</label>
                        <select
                            id="produto"
                            value={""}
                            onChange={""}
                            required
                        >
                            <option value="">Selecione um produto</option>
                            <option value="produto1">Produto 1</option>
                            <option value="produto2">Produto 2</option>
                            <option value="produto3">Produto 3</option>
                        </select>
                    </div>

                    <div className="InputGroup">
                        <label htmlFor="tipoMovimentacao">Tipo de Movimentação</label>
                        <select
                            id="tipoMovimentacao"
                            
                            onChange={""}
                            required
                        >
                            <option value="entrada">Entrada</option>
                            <option value="saida">Saída</option>
                        </select>
                    </div>

                    <div className="InputGroup">
                        <label htmlFor="quantidade">Quantidade</label>
                        <input
                            type="number"
                            id="quantidade"
                           
                            onChange={""}
                            required
                            min="1"
                        />
                    </div>

                    <div className="InputGroup">
                        <label htmlFor="dataMovimentacao">Data da Movimentação</label>
                        <input
                            type="date"
                            id="dataMovimentacao"
                           
                            onChange={""}
                            required
                        />
                    </div>
                    <button type="submit" className="BtnMovimentacao">
                        Registrar Movimentação
                    </button>
                </form>
            </section>
        </main>
    );
};

export default MovimentacaoEstoque;