// Immports Bibliotecas

// Imports Css
import '../style/AdminDashBoard.css'

// Imports Componenets
import Admincharts from '../components/AdminApexcharts'

// imports icons and images
import { BsGraphUpArrow } from "react-icons/bs";
import { 
    MdGroups,
    MdOutlineTrendingUp,
    MdChecklist,
    MdHistory,
    MdFilterAlt
} from "react-icons/md";

const AdminDashBoard = () => {
    return (
        <>
            <main>
                <div className="Title">
                    <h1>Dash<span>Board</span></h1>
                </div>
                <section className='grafil-cards'>
                    <div className="grafil-card">
                        <div className="total-text">
                            <span>Total de Usuario</span>
                            <i><MdGroups /></i>
                        </div>
                        <div className="total-number">
                            <h2>100</h2>
                            <i><MdOutlineTrendingUp /><span>8,5%</span></i>
                            <span className='text-update'>Dados mais recentes</span>
                        </div>
                    </div>
                    <div className="grafil-card">
                        <div className="total-text">
                            <span>Total de pedidos</span>
                            <i><MdChecklist /></i>
                        </div>
                        <div className="total-number">
                            <h2>100</h2>
                            <i><MdOutlineTrendingUp /><span>8,5%</span></i>
                            <span className='text-update'>Dados mais recentes</span>
                        </div>
                    </div>
                    <div className="grafil-card">
                        <div className="total-text">
                            <span>Total de vendas</span>
                            <i><BsGraphUpArrow /></i>
                        </div>
                        <div className="total-number">
                            <h2>R$ 100,00</h2>
                            <i><MdOutlineTrendingUp /><span>8,5%</span></i>
                            <span className='text-update'>Dados mais recentes</span>
                        </div>
                    </div>
                    <div className="grafil-card">
                        <div className="total-text">
                            <span>Total de pendentes</span>
                            <i><MdHistory /></i>
                        </div>
                        <div className="total-number">
                            <h2>100</h2>
                            <i><MdOutlineTrendingUp /><span>8,5%</span></i>
                            <span className='text-update'>Dados mais recentes</span>
                        </div>
                    </div>
                </section>

                <section className='Apexcharts'>
                    <div className="container-charts">
                        <Admincharts /> 
                    </div>
                </section>

                <section className='detalhes-pedidos'>
                    <div className="subtitle">
                        <h2>Detalhes dos pedidos</h2>
                        <form>
                            <label htmlFor="months"><i><MdFilterAlt /></i></label>
                            <select id="months" name="months">
                                <option value="janeiro">Janeiro</option>
                                <option value="fevereiro">Fevereiro</option>
                                <option value="marco">Março</option>
                                <option value="abril">Abril</option>
                                <option value="maio">Maio</option>
                                <option value="junho">Junho</option>
                                <option value="julho">Julho</option>
                                <option value="agosto">Agosto</option>
                                <option value="setembro">Setembro</option>
                                <option value="outubro">Outubro</option>
                                <option value="novembro">Novembro</option>
                                <option value="dezembro">Dezembro</option>
                            </select>
                        </form>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>IMG</th>
                                <th>Produto</th>
                                <th>Local</th>
                                <th>Data</th>
                                <th>Quantidade</th>
                                <th>Valor-Unitario</th>
                                <th>Valor-Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="https://cambuci.vtexassets.com/arquivos/ids/1033160/Bola-de-Futsal-Penalty-S11-R1-XXIV.jpg?v=638372870109700000" alt="Bola Penalty"/></td>
                                <td>Produto 1</td>
                                <td>Local 1</td>
                                <td>01/01/2021</td>
                                <td>1</td>
                                <td>R$ 100,00</td>
                                <td>R$ 100,00</td>
                                <td>Entregue</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </main>
        </>
    )
}

export default AdminDashBoard
