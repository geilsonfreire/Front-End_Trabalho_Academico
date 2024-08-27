// Imports Bibliotecas
import { useState } from 'react';
import ApexCharts from "react-apexcharts";

const AdminApexcharts = () => {
    const [options] = useState({
        chart: {
            id: "area",
            type: "area",
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        yaxios: {
            labels: {
                formatter: (value) => {
                    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                },
        }
        },
        tooltip: {
            y: {
                formatter: (value) => {
                    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                }
            }
        },
        dataLabels: {
            formatter: (value) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        title: {
            text: 'Analise de Vendas',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'normal',
            }
        },
    }); // configurações das opçoes do gráfico

    const [series ] = useState([
        {
            name: "Vendido",
            data: [30000, 40000, 45000, 50000, 49000, 60000, 70000],
        },
    ]); // Exibindo os dados que deseja exibir no gráfico
   

    return (
        <>
            <ApexCharts
                options={options}
                series={series}
                type="area"
                width="100%"  
                height="100%"
            />
        </>
    )
}

export default AdminApexcharts

