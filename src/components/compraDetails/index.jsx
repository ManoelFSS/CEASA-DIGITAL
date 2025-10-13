import { useEffect, useState, useRef } from "react";
import { Container_datails } from "./styles"
// icons
import { FaWindowClose } from "react-icons/fa";
import { FaFileDownload  } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

// components
import Loading from "../loading";
import Messege from "../messege";
import BtnNavigate from "../btns/btnNavigate";

// context 
import { useVendas } from "../../context/VendasContext"
import { useBuys } from "../../context/BuysContext";
import { useFornecedores } from "../../context/FornecedoresContext";
import { useAuthContext } from "../../context/AuthContext";
import {useLogs} from '../../context/LogContext'
import { useDashboard } from "../../context/DashboardContext";
// download
import html2canvas from "html2canvas";

const CompraDetails = ({setCompraModalDetails, userId, itemsPorPage, paginacao, ano, mes }) => {

    const { reloadDashboard, setReloadDashboard } = useDashboard();
    const {user} = useAuthContext();
    const {cadastrarLog} = useLogs();

    const { atualizarStatusParaDebitos} = useFornecedores();
    const {contarCompraPendentesOuAtrasadas , compras, setCompras, idCompra, editarParcelaStatus, buscarComprasPorAdmin, editarCompra, setIdCompra } = useBuys();
    const { vendas, setVendas, idVenda,  buscarVendasPorAdmin, editarVenda, setIdVenda } = useVendas();

    const [vendaFilter, setVendaFilter] = useState({});
    const [idParcela, setIdParcela] = useState('');
    const [confirmPacela, setConfirmPacela] = useState(false);
    const [messege, setMessege] = useState(null);
    const [closeBtn, setCloseBtn] = useState(false);
    const [controlerVendaFilter, setControlerVendaFilter] = useState(null);
    const [textBtn, setTextBtn] = useState('Cancelar');

    const hasRun = useRef(false);

    useEffect(() => {
        const getVendaItem = compras.find(venda => venda.id === idCompra);
        setVendaFilter(getVendaItem);
        console.log(getVendaItem);
    }, [idCompra, controlerVendaFilter])

    useEffect(() => {
        // if (!hasRun.current) return;
        // hasRun.current = true;
        setMessege(null);
        if(!idParcela) return

        const hendleStatusVenda  = async () => {
            await editarParcelaStatus(idParcela, 'Paga');

            const getVendas = await buscarComprasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
            // console.log(getVendas);
            setCompras(getVendas);

            const getVendaItem = getVendas.find(venda => venda.id === idCompra);
            const getParcelas = await getVendaItem?.parcelas_compra?.filter(parcela => parcela.status === 'A vencer');
            console.log(getVendaItem);
            console.log(getParcelas);

            if(getParcelas.length === 0) {
                await editarCompra(idCompra, 'Paga');
                const getVendas = await buscarComprasPorAdmin(userId, itemsPorPage, paginacao, ano, mes);
                setCompras(getVendas);

                const getNumeroDeVendasDoCliente = await contarCompraPendentesOuAtrasadas (userId, getVendaItem.fornecedor_id);
                console.log("contarVendas", getNumeroDeVendasDoCliente);
                if(getNumeroDeVendasDoCliente === 0) {
                    await atualizarStatusParaDebitos(getVendaItem.fornecedor_id, "Nada a Pagar");
                    console.log("cliente nao tem nemhuma venda pendente, status Em Dias");
                }
            }
            
            setControlerVendaFilter(!controlerVendaFilter);
            setCloseBtn(false);
            setTextBtn('OK');
            setMessege({success: true, title: "Parcela confirmada com sucesso", message: "A parcela foi confirmada como Pago"});

            const parcelaItem = await  getVendaItem ?.parcelas_compra.find(parcela => parcela.id === idParcela);
            console.log(parcelaItem);

            if (parcelaItem) {
                const log = {
                    adminid: userId,    
                    colaborador_id: user.id, 
                    name: user.name,   
                    titulo: '✅ Pagamento confirmado',   
                    mensagem: `A parcela referente à venda de ${getVendaItem.created_at.split('T')[0].split('-').reverse().join('/')} 
                                para o cliente: ${getVendaItem.name.split(' ').slice(0, 2).join(' ')} foi registrada como paga,
                                no valor de: ${parcelaItem.valor_parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 
                    status: 'Não lida',   
                    referencia_id: idCompra, 
                    created_at: new Date().toISOString()
                };

                await cadastrarLog(log);
            }

            setReloadDashboard(!reloadDashboard);// atualiza o dashboard
        }

        hendleStatusVenda ();
    }, [confirmPacela]);

    const confirmaPagamento  = (id, table) => {
        setTextBtn('Cancelar');
        setMessege({success: true, title: "Tem certeza que deseja  Confirmar  o pagamento dessa Parcela ?", message: "Atenção ao confirmar o pagamento dessa parcela Não pode ser desfeito"});
        setIdParcela(id);
        setCloseBtn(true);
    }

    const divRef = useRef();
    const handleDownload = async () => {
        const element = divRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "div-capturada.png";
        link.click();
    };

    return (
        <Container_datails>
            <section ref={divRef} className="datails-container">
                <div className="close-container">
                    <h1>CEASA DIGITAL</h1>
                    <FaWindowClose className="close" onClick={() => {setCompraModalDetails(false), setIdCompra(null)}} />
                </div>
                <h2>Detalhes da Compra</h2>
                <div className="datails-client">
                    <div className="datails-date">
                        <div>
                            <h4>Fornecedor</h4>
                            <p className="name">{vendaFilter?.name}</p>
                        </div>
                        <div>
                            <h4>Data da venda</h4>
                            <p>{vendaFilter?.created_at?.split('T')[0].split('-').reverse().join('/')}</p>
                        </div>
                    </div>
                    
                    <div className="datails-client-info">
                        <div>
                            <h4>Telefone</h4>
                            <p>{vendaFilter?.phone}</p>
                            <h4>CPF | CNPJ</h4>
                            <p>{vendaFilter?.cpf || "Não informado"}</p>
                        </div>
                        <div style={{paddingLeft: "60px"}}>
                            <h4>Valor total</h4>
                            <p style={{ color: "green", fontSize: "0.9rem", fontWeight: "bold" }}>{vendaFilter?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <h4>Valor da entrada</h4>
                            <p>{vendaFilter?.valor_entrada?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                </div>

                <div className="datails-payment">
                    <ul className="payment-header" >
                        <li style={{width: "90px"}}>
                            <p>Produtos</p>
                        </li>
                        <li style={{width: "60px"}}>
                            <p>Quant</p>
                        </li>
                        <li style={{width: "40px"}}>
                            <p>Tipo</p>
                        </li>
                        <li style={{width: "80px"}}>
                            <p>Valor</p>
                        </li>
                        <li style={{width: "75px"}}>
                            <p>Val Total</p>
                        </li>
                    </ul>
                    {vendaFilter?.itens_compra?.length > 0 && 
                        vendaFilter?.itens_compra?.map((produto, index) =>
                        <ul className="payment-list" key={index} >
                            <li style={{width: "90px"}}>
                                <p>{produto?.name}</p>
                            </li>
                            <li style={{width: "60px"}}>
                                <p>{produto?.quantidade}</p>
                            </li>
                            <li style={{width: "40px"}}>
                                <p>{produto?.Type_sales === "unidade" ? "Und" : produto?.Type_sales === "kg" ? "Und" : produto?.Type_sales}</p>
                            </li>
                            <li style={{width: "80px"}}>
                                <p>{produto?.valor_unitario?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </li>
                            <li style={{width: "75px"}}>
                                <p>{produto?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </li>
                        </ul>
                    )}
                    <div className="payment-total">
                        <p>Total: {vendaFilter?.valor_total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>

                { vendaFilter?.parcelas_compra?.length > 0 &&
                    <div className="datails-payment">
                        <h5>Parcelas</h5>
                        <ul style={{ backgroundColor:" #FE7E01"}} className="payment-header" >
                            <li style={{ width: "90px" }}>
                                <p>Data Venc</p>
                            </li>
                            <li style={{ width: "90px" }}>
                                <p>Valor</p>
                            </li>
                            <li style={{ width: "90px" }}>
                                <p>Status</p>
                            </li>
                            <li style={{ width: "70px" }}>
                                <p>Ação</p>
                            </li>
                        </ul>
                        {vendaFilter?.parcelas_compra?.length > 0 && 
                            vendaFilter?.parcelas_compra?.sort((p1, p2) => new Date(p1.data_vencimento) - new Date(p2.data_vencimento)).map((parcela, index) =>
                            <ul className="payment-list" key={index} style={{ 
                                    backgroundColor: parcela?.status === "A vencer" ? "rgba(255, 230, 0, 0.06)" : parcela?.status === "Hoje" ? "rgba(5, 34, 122, 0.11) " : parcela?.status === "Paga" ? "rgba(23, 170, 7, 0.11)" : parcela?.status === "Atrasada" ? "rgba(255, 0, 204, 0.09)" : "rgba(232, 8, 8, 0.09)" }} >
                                <li style={{ width: "90px" }}>
                                    <p>{parcela?.data_vencimento.split('T')[0].split('-').reverse().join('/')}</p>
                                </li>
                                <li style={{ width: "90px" }}>
                                    <p>{parcela?.valor_parcela?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </li>
                                <li style={{ width: "90px" }}>
                                    <p className="status">{parcela?.status}</p>
                                </li>
                                <li style={{ width: "70px" }}>
                                    <p>
                                        {parcela?.status === "Cancelada" ? <FcCancel className="cancel-icon" /> : 
                                            <input 
                                                className="checkbox"
                                                type="checkbox" 
                                                checked={parcela?.status === "Paga"}
                                                onChange={() => vendaFilter?.status !== "Cancelada" && parcela?.status !== "Paga" && confirmaPagamento(parcela?.id)}
                                            />
                                        }
                                    </p>
                                </li>
                            </ul>
                        )}
                        <div className="payment-total">
                            <div className="title">
                                <p >Parcelas</p>
                            </div>
                            <div>
                                <h4>Total: {vendaFilter?.parcelas_compra?.length}</h4>
                                <p style={{ color: "red" }}>{vendaFilter?.valor_restante?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <div>
                                <h4>Pagas: {vendaFilter?.parcelas_compra?.filter((parcela) => parcela.status === "Paga").length}</h4>
                                <p style={{ color: "green" }}>
                                    <span>-</span>{" "}
                                    {
                                        (
                                        vendaFilter?.parcelas_compra
                                            ?.filter((parcela) => parcela.status === "Paga")
                                            .reduce((total, parcela) => total + Math.round(Number(parcela.valor_parcela || 0) * 100), 0) / 100
                                        ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                    }
                                </p>
                            </div>
                            <div>
                                <h4>Pendentes: {vendaFilter?.parcelas_compra?.filter((parcela) => parcela.status !== "Paga").length}</h4>
                                <p>{(vendaFilter?.valor_restante - vendaFilter?.parcelas_compra?.filter((parcela) => parcela.status === "Paga").reduce((total, parcela) => total + parcela.valor_parcela, 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        </div>
                    </div>
                }
                <div className="datails-download">
                    <p 
                        style={{ backgroundColor: vendaFilter?.status === "Cancelada" ? "red" : vendaFilter?.status === "Paga" ? "green" : " #FFCB1F" }}
                    >{vendaFilter?.status === "Cancelada" ? "Cancelada" : vendaFilter?.status === "Paga" ? "Paga" : "Pendente"}</p>
                    <FaFileDownload 
                        className="icon" 
                        onClick={() => {
                            handleDownload();
                        }}
                    />
                </div>
            </section>
            
            { messege && <Messege $buttonText={textBtn} button={closeBtn && <BtnNavigate $text="Sim" onClick={() => setConfirmPacela(!confirmPacela)} />} $title={messege.title} $text={messege.message} $setMessege={setMessege} /> }
        </Container_datails>
    )
}

export default CompraDetails
