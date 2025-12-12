import { Container_login} from "./styles";
//components
import Logo from "../../assets/carrinho.png"
import LoginForm from "../../components/forms/userForm/loginForm"
import Register from "../../components/forms/userForm/register"
import Password_Recovery from "../../components/forms/userForm/password_recovery"
import Messege from "../../components/messege";
// context
import { useAuthContext } from "../../context/AuthContext";
// icons

const Login = () => {
    const { messege, setMessege, selectForm, setSelectForm } = useAuthContext();
    
    return (
        <Container_login>
            <section className="box-left">
                <div className="box-container">
                    <img src={Logo} alt="logo"/>
                    <div>
                        <h1>CEASA DIGITAL</h1>
                    </div>
                </div>
            </section>
            <section className="box-right">
                <div className="box-blu">
                    { selectForm === "login" && <LoginForm  setSelectForm={setSelectForm}/>}
                    { selectForm === "register" && <Register  setSelectForm={setSelectForm} /> }
                    { selectForm === "password" && <Password_Recovery  setSelectForm={setSelectForm} />}
                    { messege && <Messege $setMessege={setMessege} $buttonText="OK" $title={messege.title} $text={messege.message} /> }
                </div>
                <p className="copyright"> © 2025 Trin-Codex - (74)93505-0160</p>
            </section>
        </Container_login>
    )
}

export default Login;
