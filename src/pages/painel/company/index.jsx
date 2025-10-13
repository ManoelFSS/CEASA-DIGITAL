import { Container_company } from "./styles"
// icons
import { IoMdPerson } from "react-icons/io";
import { AiOutlineAlignRight } from "react-icons/ai";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { HiMiniStar } from "react-icons/hi2";
import { PiHandTapFill } from "react-icons/pi";
// context
import { useLogs } from "../../../context/LogContext"

const Company = () => {

    const { logs } = useLogs()

    const dataHeader = [
        {icon: <IoMdPerson className="icon" />},
        { name: "Colaborador", icon: <AiOutlineAlignRight  className="icon" /> },
        { name: "Telefone", icon: <BsFillTelephonePlusFill className="icon" /> },
        { name: "Email", icon: <HiMiniCalendarDateRange className="icon" /> },
        { name: "Status", icon: <HiMiniStar className="icon" /> },
        { name: "Ação", icon: <PiHandTapFill className="icon" />}
    ]



    return (
        <Container_company >
            <div className="title">
                <h3>Dados da Empresa</h3>
            </div>
            <section className="container-company">
                <div className="logo-company">
                    <img src="https://ceasa-digital.netlify.app/assets/carrinho-CxB0h3LS.png" alt="logo" />
                </div>
                <div className="info-company">
                    <div className="company">
                        <div>
                            <h3>Nome:</h3>
                            <p>Trin-Codex</p>
                        </div>
                        <div>
                            <h3>CPF |CNPJ:</h3>
                            <p>Trin-Codex</p>
                        </div>
                         <div>
                            <h3>E-mail:</h3>
                            <p>exemple@gmail.com</p>
                        </div>
                        <div>
                            <h3>Telefone:</h3>
                            <p>(11) 99999-9999</p>
                        </div>
                        <div>
                            <h3>Endereço:</h3>
                            <p>Av. Paulista, 1234</p>
                        </div>
                        <div>
                            <h3>CEP:</h3>
                            <p>12345-678</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="title">
                <h3>Colaboradores</h3>
            </div>

            <section className="container">
                <div className="colaboradores">
                    <div className="header">
                        
                        <ul className="header-list">
                            {dataHeader.map((item, index) => (
                            <li key={index}>
                                {item.name} {item.icon}
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className="body">
                        <ul className="body-list">
                            <li><img src={"https://ceasa-digital.netlify.app/assets/carrinho-CxB0h3LS.png"} alt="avatar" /></li>
                            <li>{"Trin-Codex"}</li>
                            <li>{"(11) 99999-9999"}</li>
                            <li>{"trin-codex@gmail.com"}</li>
                            <li>{"Ativo"}</li>
                            <li>{"Editar"}</li>
                        </ul>
                        <ul className="body-list">
                            <li><img src={"https://ceasa-digital.netlify.app/assets/carrinho-CxB0h3LS.png"} alt="avatar" /></li>
                            <li>{"Trin-Codex"}</li>
                            <li>{"(11) 99999-9999"}</li>
                            <li>{"trin-codex@gmail.com"}</li>
                            <li>{"Ativo"}</li>
                            <li>{"Editar"}</li>
                        </ul>
                        <ul className="body-list">
                            <li><img src={"https://ceasa-digital.netlify.app/assets/carrinho-CxB0h3LS.png"} alt="avatar" /></li>
                            <li>{"Trin-Codex"}</li>
                            <li>{"(11) 99999-9999"}</li>
                            <li>{"trin-codex@gmail.com"}</li>
                            <li>{"Ativo"}</li>
                            <li>{"Editar"}</li>
                        </ul>
                    </div>
                </div>

                <div className="logs">
                    <h3>Notificações</h3>
                    <div className="box-alert">
                        {logs?.map((item, index) => (
                            <div key={index} className="alert">
                                <h4>{item.titulo}</h4>
                                <p>{item.mensagem}</p>
                                <div className="date-area">
                                    <h5>Por: {item.name.split(' ').slice(0, 2).join(' ')}</h5>
                                    <div className="date">
                                        <p>{item.created_at.split('T')[0].split('-').reverse().join('/')}</p>
                                        <span>
                                            as {new Date(item.created_at).toLocaleTimeString('pt-BR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })} 
                                            h
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="details-plan">
                <h3>Detalhes do plano</h3>
            </div>

        </Container_company>
    )
}

export default Company
