import FormLayout from "../../formLayout"
import BtnSubmit from "../../../btns/btnSubmit"
import BtnNavigate from "../../../btns/btnNavigate"
import Title from "../../../title"
import InputComponent from "../../../inputComponent"
import LabelComponent from "../../../labelComponent"
import Loading from "../../../loading"
// context
import { useAuthContext } from "../../../../context/AuthContext"
// hooks 
import useFormValue from "../../../../hooks/useFormValue"
const Register = ({setSelectForm}) => {
    const { loading } = useAuthContext();
    
    const { 
        name, setName, 
        phone, setPhone, 
        email, setEmail, 
        password,setPassword,
        checkbox, setCheckbox
    } = useFormValue();

    const handlePhoneChange = (event) => {
        const { value } = event.target;
        const formattedPhone = formatPhoneNumber(value);
        setPhone(formattedPhone);
    };
    
    function formatPhoneNumber(value) {
        // Remove qualquer caractere não numérico
        const cleanedValue = value.replace(/\D/g,'');
        // Se o valor estiver vazio, retorne uma string vazia
        if (cleanedValue.length === 0) {
            return '';
        }
        // Verifica a quantidade de números e aplica a formatação
        if (cleanedValue.length <= 2) {
            return `(${cleanedValue}`;
        } else if (cleanedValue.length <= 7) {
            return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
        } else {
            return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
        }
    }
    
    
    return (
        <FormLayout>
            <section className="logo">
                <Title $text="Cadastro"  $cor={"var(  --color-text-primary )"}  />
            </section>
            <section className="box">
                <LabelComponent $text="Nome Completo" $htmlFor="name" />
                <InputComponent 
                    $typeText="text"
                    $value={name} 
                    $onchange={(e) => setName(e.target.value.replace(/\d/g, "").trim())} 
                    $textId="name" 
                    $name="name" 
                    $placeholder="Digite seu Nome" 
                    $autoComplete="current-text" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Telefone" $htmlFor="phone" />
                <InputComponent 
                    $typeText="text"
                    $value={phone} 
                    $onchange={handlePhoneChange} 
                    $textId="phone" 
                    $name="phone" 
                    $placeholder="(xx) xxxxx-xxxx" 
                    $autoComplete="current-text" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Email" $htmlFor="email" />
                <InputComponent 
                    $typeText="email"
                    $value={email} 
                    $onchange={(e) => setEmail(e.target.value.trim())} 
                    $textId="email" 
                    $name="email" 
                    $placeholder="Exmplo@gmail.com" 
                    $autoComplete="current-email" 
                    $required 
                />
            </section>
            <section className="box">
                <LabelComponent $text="Senha" $htmlFor="senha" />
                <InputComponent 
                    $typeText="password"
                    $value={password} 
                    $onchange={(e) => setPassword(e.target.value.trim())} 
                    $textId="senha" 
                    $name="senha" 
                    $placeholder="Digite sua  Senha" 
                    $autoComplete="current-password" 
                    $required 
                />
            </section>
            <section className="box-check">
                <InputComponent 
                    $typeText="checkbox"
                    $value={checkbox} 
                    $onchange={(e) => setCheckbox(e.target.checked)} 
                    $textId="termo" 
                    $name="termo" 
                    $autoComplete="current-checkbox" 
                    $required 
                />
                <div className="text-check">
                    <span>Eu li e concordo com os <a href="#">Termos e condições</a></span>
                </div>
            </section>
            <section className="btns">
                <BtnSubmit $text="Cadastrar" />
                <BtnNavigate 
                    $text="Recuperar Senha" 
                    onClick={() => setSelectForm("password")}
                />
                <BtnNavigate 
                    $text="Fazer Login" 
                    onClick={() => setSelectForm("login")}
                />
            </section>
            {loading && <Loading />}
        </FormLayout>
    )
}

export default Register
