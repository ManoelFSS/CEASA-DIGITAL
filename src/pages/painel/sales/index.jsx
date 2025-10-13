
import { useState, useEffect} from "react";
import { Container, ContainerTable } from "./styles"
// components
import BtnNavigate from "../../../components/btns/btnNavigate"
import Select from "../../../components/select"
import Search from "../../../components/search"
import Pagination from "../../../components/pagination"
// import ProductForm from "../../../components/forms/systemForm/produtForm";
import Messege from "../../../components/messege";
import Loading from "../../../components/loading";
import MonthYearSelector from "../../../components/MonthYearSelector";
import VendasDetails from "../../../components/vendasDetails";
import Title from "../../../components/title";
// icons
import {  PiHandTapFill  } from "react-icons/pi";
import { HiMiniStar } from "react-icons/hi2";
import { AiOutlineAlignRight } from "react-icons/ai";
import { IoBagHandleSharp } from "react-icons/io5";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { FaCreditCard } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbCancel } from "react-icons/tb";
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { IoMdPerson } from "react-icons/io";
// hooks
import useSelect from "../../../hooks/useSelect"
// context
import { useAuthContext } from "../../../context/AuthContext"
import { useVendas } from "../../../context/VendasContext";
import { useClientes } from "../../../context/ClientesContext";
//image
import Perfil from "../../../assets/perfil.png"

const Sales = () => {

    const { setIdClient, caunterVendas } = useClientes();
    const {user, userId} = useAuthContext();
    const { 
        buscarVendasPorAdmin,
        messege, setMessege,
        closeModal, setCloseModal,
        vendas, setVendas,
        buscarVendasSeach,
        editarVenda,
        idVenda, setIdVenda,
    } = useVendas();

    const [valueSearch, setValueSearch] = useState('');
    const [dataNotFound, setDataNotFound] = useState(false);
    // const [cardList, setCardList] = useState(false);
    // const [btnName, setBtnName] = useState("Cadastrar");
    const [deleteControl, setDeleteControl] = useState(null);
    const [confirmCancelaVenda, setConfirmCancelaVenda] = useState(false);
    const [closeBtn, setCloseBtn] = useState(false);
    const [mes, setMes] = useState( new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [vendaModalDetails, setVendaModalDetails] = useState(false);
    const [textBtn, setTextBtn] = useState("Cancelar");
    const [isSearchMode, setIsSearchMode] = useState(false); // novo

    const handleDateChange = ({ month, year }) => {
        setAno(year);
        setMes(month + 1);
        setPaginacao(1);
        setIsSearchMode(false);  // 👈 volta para o modo normal
        setValueSearch('');
    };

    const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Cliente", icon: <AiOutlineAlignRight  className="icon" /> },
        { name: "Telefone", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Data", icon: <HiMiniCalendarDateRange  className="icon" /> },
        { name: "Forma de Pagamento", icon: <FaCreditCard  className="icon" /> },
        { name: "Valor Total", icon: <RiMoneyDollarCircleFill className="icon" /> },
        { name: "Valor de Entrada", icon: <GiReceiveMoney  className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        {name: "Ação", icon: <PiHandTapFill className="icon" />}
    ]

    const data = [
        { category: "Paga" },
        { category: "Cancelada" },
        { category: "Pendente" },
    ];

    const { select, setSelect } = useSelect("");// select
    const [paginacao, setPaginacao] = useState(1);// paginação

    const itemsPorPage = 50; // quantidade de vendas por pagina
    const totalPages = Math.ceil(caunterVendas / itemsPorPage); // total de paginas

    // 🔹 Resetar paginação ao mudar mês/ano
    useEffect(() => {
        if(totalPages > 1 ) setPaginacao(1);
    }, [mes, ano]);

    // 🔹 Buscar vendas normais
    useEffect(() => {
        if(isSearchMode) return; // 👈 volta para o modo normal

        setDataNotFound(false);
        const hendlerGetProduct = async () => {
            const vendaData = await  buscarVendasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
            if(vendaData.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setVendas(vendaData)
        }
        hendlerGetProduct();    
    }, [closeModal, paginacao, deleteControl, mes, ano, userId, isSearchMode]);


    // Buscar vendas quando usar pesquisa
    useEffect(() => {
        const fetchSearch = async () => {
            if (!isSearchMode) return; // só dispara se for busca

            setDataNotFound(false);
            const vendaSeach = await buscarVendasSeach(valueSearch, userId, itemsPorPage, paginacao);
            if(vendaSeach.length === 0) setTimeout(() => setDataNotFound(true), 2000);
            setVendas(vendaSeach);
        };
        fetchSearch();
    }, [paginacao, isSearchMode, valueSearch, userId]);
    

    // 🔹 Resetar venda quando search for apagado
    useEffect(() => {
        if(valueSearch.length <= 0){
            setIsSearchMode(false);
            setPaginacao(1);
        }
    }, [valueSearch]);

    // 🔹 Buscar vendas no clique do search
    const hendlerGetclienteSearch = async () => {
        if(!valueSearch) return;
        setIsSearchMode(true);
        setPaginacao(1);
        setVendas([]);
        const vendaSeach = await buscarVendasSeach(valueSearch, userId, itemsPorPage, 1);
        if(vendaSeach.length === 0) setTimeout(() => setDataNotFound(true), 2000);
        setVendas(vendaSeach);
    };

    // 🔹 Cancelar venda
    useEffect(() => {
        if(!confirmCancelaVenda || !idVenda) return;
        const cancelarVenda = async () => {
            await editarVenda(idVenda, "Cancelada");
            setDeleteControl(!deleteControl)
            setMessege(null);
            setIdVenda(null);
            setCloseBtn(false);
            setConfirmCancelaVenda(false);
        }
        cancelarVenda(); 
    }, [confirmCancelaVenda]);

    const hendleCancelaVenda = (id) => {
        setMessege({success: true, title: "Tem certeza que deseja Cancelar essa Venda?", message: "Atenção recomendamos cancelar a venda em casos de problemas com o pagamento ou devolução"});
        setIdVenda(id);
        setCloseBtn(true);
    }

    const totalPago = vendas?.reduce((money, venda) => {
        if (venda.status === "Paga") {
            // soma valor total da venda
            return money + (venda.valor_total || 0);
        } else if (venda.parcelas_venda?.length) {
            // soma apenas parcelas pagas
            const parcelasPagas = venda.parcelas_venda
                .filter(parcela => parcela.status === "Paga")
                .reduce((total, parcela) => total + (parcela.valor_parcela || 0), 0);
            return money + parcelasPagas;
        }
        return money;
    }, 0);

    const totalPagoFormatado = totalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <Container>
            <section className="box-filter">
                <div className="title">
                    <IoBagHandleSharp className="icon" />
                    <Title $text="Vendas" $fontSize={"1.5rem"}  $cor={"var(  --color-text-primary )"} />
                    <p>{totalPagoFormatado}</p>
                </div>
                {totalPages > 1 && <Pagination 
                    $totalPages={totalPages} 
                    $paginacao={paginacao} 
                    $setPaginacao={setPaginacao}
                />}
                <div className="filter">
                    <Select     
                        select={select} 
                        setSelect={setSelect}
                        data={data} 
                        $width={"130px"}
                    />
                    <Search 
                        valueSearch={valueSearch}
                        setValueSearch={setValueSearch}
                        $height={"35px"}
                        $width={"200px"}
                        onClick={hendlerGetclienteSearch}
                    />
                    <MonthYearSelector userRegisterYear={user?.createdat?.slice(0, 4)} onChange={handleDateChange} />
                </div>
            </section>
            <ContainerTable>
                <section className="table">
                    <div className="header">
                        <ul className="header-list">
                            {dataHeader.map((item, index) => (
                            <li key={index}>
                                {item.name} {item.icon}
                            </li>
                            ))}
                        </ul>
                    </div>
                    {vendas?.length > 0 ? (
                        <div className="body">
                            {vendas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .filter(item => {
                                const search = valueSearch.toLowerCase();
                                const nomeInclui = item.name?.toLowerCase().includes(search);
                                const contemTermo = nomeInclui
                                if (select !== "Todas") return item.status === select && contemTermo;
                                return contemTermo;
                            })
                            .map((item, index) => (
                                <ul className="body-list" key={index} style={{ backgroundColor: item.created_at.split("T")[0] === new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' }) ? "rgba(175, 188, 179, 0.8)" : "" }}>
                                    <li><img src={item.url_image ? item.url_image : Perfil} alt="avatar" /></li>
                                    <li>{item.name}</li>
                                    <li>{item.phone}</li>
                                    <li>{new Date(item.created_at).toLocaleDateString('pt-BR')}</li>
                                    <li>{item.forma_pagamento}</li>
                                    <li>{item.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                                    <li>{item.valor_entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</li>
                                    <li>
                                        <span style={{ 
                                            backgroundColor: item.status === "Paga" ? "rgb(78, 138, 98)" : item.status === "Pendente" ? " #FFCB1F" : "rgb(211, 5, 5)",
                                        }}>
                                            {item.status}
                                        </span>
                                    </li>
                                    <li className="icons">
                                        <IoLogoWhatsapp
                                            className="icon-whatsapp"
                                            onClick={() =>
                                                window.open(
                                                `https://api.whatsapp.com/send?phone=55${item.phone.replace(/[^\d]/g, '')}`
                                                )
                                            }
                                        />
                                        <HiOutlineInformationCircle 
                                            className="icon" 
                                            onClick={() => {
                                                setIdVenda(item.id);
                                                setVendaModalDetails(true);
                                            }}
                                        />
                                        <TbCancel  
                                            className="icon" 
                                            onClick={() => {
                                                item.status !== "Cancelada" ? hendleCancelaVenda(item.id) : setMessege({title: "Atenção", message: "Essa venda ja foi cancelada!"});
                                                item.status === "Cancelada" && setCloseBtn(false)
                                                item.status === "Cancelada" && setTextBtn("OK");
                                                setIdClient(item.cliente_id);
                                            }}
                                        />
                                    </li>
                                </ul>
                            ))}
                        </div>
                    ) : !dataNotFound ? (
                        <div style={{ margin: "auto" }}><Loading /></div>
                    ) : (
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "auto" }}>
                            Nenhuma Venda registrada !
                        </p>
                    )}
                </section>
            </ContainerTable>

            {messege && 
                <Messege setIdVenda={setIdVenda} setTextBtn={setTextBtn} $buttonText={textBtn} button={closeBtn &&   <BtnNavigate $text="Sim" onClick={() => setConfirmCancelaVenda(true)} />} $title={messege.title} $text=  {messege.message} $setMessege={setMessege} 
                />
            }

            {vendaModalDetails && 
                <VendasDetails  
                    setVendaModalDetails={setVendaModalDetails} 
                    userId={userId} 
                    itemsPorPage={itemsPorPage} 
                    paginacao={paginacao} 
                    ano={ano} 
                    mes={mes} 
                    isSearchMode={isSearchMode}
                    valueSearch={valueSearch}
                />
            }
        </Container>
    )
}

export default Sales
