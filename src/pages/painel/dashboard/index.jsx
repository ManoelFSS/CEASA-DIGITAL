import { useState, useEffect } from "react";
import { Container_dashboard } from "./styles";
//companents
import TopProductsChart from "../../../components/charts/topProductChart";
import BarChart_x from "../../../components/charts/barChart_x";
import ChartPizza from "../../../components/charts/chartPizza";
import CardDashboard from "../../../components/cards/cardDashboard";
import StockProductChart from "../../../components/charts/stockProductChart";
import VendasChart from "../../../components/charts/vendasChart";
import Loading from "../../../components/loading";
// icons 
import { FaChartSimple, FaArrowUpRightDots, FaHandshake   } from "react-icons/fa6";
import { FaHandHoldingUsd, FaCartArrowDown  } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
// cpontext
import {useDashboard} from "../../../context/DashboardContext"


const Dashboard = ({$toogleMenu, $setToogleMenu}) => {

    const {
        comparativoVendas, 
        comparativoCompras,
        comparativoProduto,
        dados 
    } = useDashboard();

    console.log(comparativoCompras[1])


    return (
        <Container_dashboard >
            <section className="cards" style={{width: $toogleMenu ? "100%" : ""}}>
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={dados.financeiro} 
                    text="Valor total recebido | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(3, 205, 114)"}
                    visible={true}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon "
                            style={{ color: "rgb(3, 205, 114)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $money={comparativoCompras[1]?.reduce((money, item) => money + item, 0)} 
                    text="Despesas Total | Mês" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(206, 12, 12)"}
                    visible={true}
                    icon={
                        <FaArrowUpRightDots  
                            className="icon rotate-icon"
                            style={{ color: "rgb(206, 12, 12)" }}
                        />
                    } 
                />

                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $moneyHoje={dados.parcelasComprasHoje} 
                    $moneyAtrasado={dados.parcelasAtrasadasCompras}
                    $moneyTotal={dados.parcelasComprasHoje + dados.parcelasAtrasadasCompras}
                    text="A Pagar" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={" #FE7E01"}
                    visible={false}
                    icon={
                        <RiMoneyDollarCircleFill   
                            className="icon"
                            style={{ color: " #FE7E01" }}
                        />
                    } 
                />
                
                <CardDashboard 
                    $toogleMenu={$toogleMenu}
                    $moneyHoje={dados.parcelasVendasHoje} 
                    $moneyAtrasado={dados.parcelasAtrasadasVendas}
                    $moneyTotal={dados.parcelasVendasHoje + dados.parcelasAtrasadasVendas}
                    text="A Receber" 
                    cor={"rgb(255, 255, 255)"}
                    cor2={"rgb(2, 119, 16)"}
                    visible={false}
                    icon={
                        <FaHandHoldingUsd   
                            className="icon"
                            style={{ color:"rgb(2, 119, 16)"}}
                        />
                    } 
                />

            </section>
            
            <section className="charts-container">
                <section className="charts-x">
                    <TopProductsChart 
                        title="Produtos" 
                        text="Mais vendidos no Mês"
                        icon={<FaChartSimple className="icon" />}
                    >
                        <BarChart_x 
                            data={dados.produtos}
                        />
                    </TopProductsChart>
                    
                    <TopProductsChart 
                        title="Clientes" 
                        text="Que mais Compraram no Mês"
                        icon={<FaChartSimple className="icon" />}
                    >
                        <BarChart_x 
                            data={dados.clientesMais}
                        />
                    </TopProductsChart>
                </section>

                <TopProductsChart 
                    title="Compras" 
                    text="do Mês"
                    icon={<FaCartArrowDown  className="icon" />}
                    width="250px"
                    height="410px"
                    link="/buys"
                >
                    <ChartPizza 
                        data={dados.compras} 
                        pizzHeight={170}
                        pizzWidth={220}
                        innerRadius={20}
                        outerRadius={50}
                    />
                </TopProductsChart>

                <TopProductsChart 
                    title="Vendas" 
                    text="do Mês"
                    icon={<FaCartArrowDown  className="icon" />}
                    width="250px"
                    height="410px"
                    link="/sales"
                >
                    <ChartPizza 
                        data={dados.vendas} 
                        pizzHeight={170}
                        pizzWidth={220}
                        innerRadius={20}
                        outerRadius={50}
                    />
                </TopProductsChart>

                <TopProductsChart 
                    title="Clientes" 
                    text="Total cadastrados"
                    icon={<BsFillPersonLinesFill   className="icon" />}
                    width="250px"
                    height="410px"
                    link="/clients"
                >
                    <ChartPizza 
                        data={dados.clientes} 
                        pizzHeight={250}
                        pizzWidth={220}
                        innerRadius={30}
                        outerRadius={60}
                    />
                </TopProductsChart>

                <TopProductsChart 
                    title="Fornecedores" 
                    text="Total cadastrados"
                    icon={<FaHandshake   className="icon" />}
                    width="250px"
                    height="410px"
                    link="/suppliers"
                >
                    <ChartPizza 
                        data={dados.fornecedores} 
                        pizzHeight={250}
                        pizzWidth={220}
                        innerRadius={30}
                        outerRadius={60}
                    />
                </TopProductsChart>
            </section>

            <section className="charts-container-vendas">
                <section className="chart-vendas"> 
                    <StockProductChart vendas={comparativoProduto} />
                </section>
            </section>    

            <section className="charts-container-vendas">
                <section className="chart-vendas">
                    <VendasChart 
                        vendas={comparativoVendas}  
                        title="Gráfico de Vendas"
                        legend={['Vendas do mês anterior', 'Vendas do mês atual']}
                        bg_colors={['rgb(64, 72, 108)', ' #00A91F']}
                    />
                </section>
            </section>   

            <section className="charts-container-vendas">
                <section className="chart-vendas">
                    <VendasChart 
                        vendas={comparativoCompras}  
                        title="Gráfico de Compras"
                        legend={['Compras do mês anterior', 'Compras do mês atual']}
                        bg_colors={['rgb(139, 139, 139)', ' #FE7E01']}
                    />
                </section>
            </section>    
        </Container_dashboard>
    )
}

export default Dashboard
