import { useState } from "react";
import { Container } from "./styles"
// // componentes
import Select from "../../select"
import Pagination from "../../pagination"
import useSelect from "../../../hooks/useSelect"
import MonthYearSelector from "../../MonthYearSelector"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
// context 
import { useDashboard } from "../../../context/DashboardContext";
import { useAuthContext } from "../../../context/AuthContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StockProductChart = ({vendas, $height, $ocult}) => {
    
    console.log(vendas);
    const {setMonthProduto, setYearProduto} = useDashboard();
    const { user } = useAuthContext();

    const { select, setSelect  } = useSelect()
    const [paginacao, setPaginacao] = useState(1);

    const itemsPerPage = 15;
    const startIndex = (paginacao - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // fiter e mimite 12 items
    const filteredItems = vendas.filter(item => select !== "Todas" ? item.category === select : item)
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const labels = filteredItems.slice(startIndex, endIndex).map(item => item.name);

    const estoque = vendas.map(item =>
        item.stock 
    );
    
    const vendidos = vendas.map(item =>
        item.quantidade
    );
    
    const valorEmDinheiro = vendas.map(item =>
        item.valor_total
    );
    
    const esgotado = vendas.map(item =>
        item.stock <= 0 && item.quantidade > 0 ? item.quantidade : null
    );
    

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, ],
                backgroundColor: 'rgba(255, 157, 0, 0)',
                minBarLength:0, 
                maxBarLength:0, 
                // barThickness: 10,
            },
            {
                label: 'Estoque atual',
                data: estoque,
                backgroundColor: estoque.map((stock, index) => stock <= 0 ? 'red' : ' #FE7E01'),
                minBarLength:10, 
                // barThickness: 10,
            },
            {
                label: 'vendas | Mês',
                data: vendidos,
                backgroundColor: valorEmDinheiro.map((stock, index) => stock <= 0 ? '#d4d4d4' : 'rgb(0, 72, 255)'), 
                minBarLength:10,
                // barThickness: 10,
            },
            {
                label: 'Valor total em Vendas | Mês',
                data: valorEmDinheiro,
                backgroundColor: valorEmDinheiro.map((stock, index) => stock <= 0 ? '#a7a5a5' : 'rgb(4, 184, 37)'),    
                minBarLength: 10, 
                // barThickness: 10,
            },
        ],
    };

    // Plugin para desenhar os nomes na vertical
    const verticalLabelPlugin = {
        id: 'verticalLabels',
        afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const datasetMeta = chart.getDatasetMeta(0); // Índice 2 = 'Vendidos'
    
        ctx.save();
    
        chart.data.labels.forEach((label, index) => {
            const bar = datasetMeta.data[index];
    
            if (bar) {
            const barX = bar.x + 5 ;
    
            ctx.save();
            ctx.translate(barX , chart.chartArea.bottom - 20);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'left';
            ctx.fillStyle = '#000';
            ctx.font = ' 14px sans-serif';
            ctx.fillText(label, 0, 0);
            ctx.restore();
            }
        });
    
        ctx.restore();
        }
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        const index = context.dataIndex;

                        const item = vendas[index]; // aqui acessamos o item da venda correspondente

                        if (label === 'Valor total em Vendas | Mês') {
                            return `${label}: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
                        }

                        if (item?.Type_sales === 'kg' && label === 'vendas | Mês') {
                            return `${label}: ${value} Kg`;
                        } else {
                            return `${label}: ${value} Unid`;
                        }
                    }
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    display:false, // esconde os nomes padrões
                },
                grid: {
                    display: false,
                },
                barPercentage: 1.0,
                categoryPercentage: 0.8,
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                },
            },
        },
    };


    const handleDateChange = ({ month, year }) => {
        console.log('Mês:', month, 'Ano:', year);
        setMonthProduto(month + 1), 
        setYearProduto(year)
    };


    return (
        <Container >
            <div className="chart-header">
                <div>
                    <h3>Gráfico Controle de Estoque</h3>
                    <div className="custom-legend">
                        {data.datasets.map((dataset, index) => (
                            dataset.label && (
                                <div key={index} className="legend-item">
                                    <span
                                        className="legend-color"
                                        style={{ backgroundColor: dataset.label === 'vendas | Mês' ?  'rgb(0, 72, 255)' : 'rgb(4, 184, 37)' }}
                                    ></span>
                                    {dataset.label}
                                </div>
                            )
                        ))}
                        <div className="legend-item">
                            <span
                                className="legend-color"
                                style={{ backgroundColor: "red" }}
                            ></span>
                            {"Esgotado"}
                        </div>
                    </div>
                </div>
                <Select 
                    data={vendas} 
                    select={select} 
                    setSelect={setSelect}
                    $setPaginacao={setPaginacao}
                    $width={"140px"}
                />
                <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />
                <div className="selects-ano-mes">
                    <MonthYearSelector userRegisterYear={user?.createdat?.slice(0, 4)} onChange={handleDateChange} />
                </div>
            </div>
            <div className="chart-main" style={{ height:  "190px"}}>
                <Bar data={data} options={options} plugins={[verticalLabelPlugin]} />
            </div>
        </Container>
    );
};

export default StockProductChart;



