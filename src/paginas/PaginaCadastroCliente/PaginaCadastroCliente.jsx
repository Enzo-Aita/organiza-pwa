import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal"
import "./PaginaCadastroCliente.css"
import { useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";

function PaginaCadastroCliente() {

const [nome, setNome] = useState("");
const [email, setEmail] = useState("");
const [telefone, setTelefone] = useState("");
const [dataNascimento, setDataNascimento] = useState("");
const [cpf, setCpf] = useState("");

const Salvar = () => {
    const cliente = {
        nome,
        email,
        telefone,
        dataNascimento,
        cpf
    };
    console.log(cliente);
};



    return ( <Principal titulo="Cadastro de Cliente" voltarPara="/" >

         <CampoCustomizado 
         label="Nome"
         valor={nome} 
         onchange= {(e) => setNome(e.target.value)}
          />
        <CampoCustomizado 
        label="Email" 
        valor={email} 
        onchange= {(e) => setEmail(e.target.value)} 
        />
        <CampoCustomizado
         label="Telefone"
          valor={telefone} 
          onchange= {(e) => setTelefone(e.target.value)}
        />
        <CampoCustomizado 
        label="Data de Nascimento"
         valor={dataNascimento} 
         onchange= {(e) => setDataNascimento(e.target.value)}
        />
        <CampoCustomizado 
        label="CPF"
         valor={cpf} 
         onchange= {(e) => setCpf(e.target.value)} 
        />
  
        <BotaoCustomizado tipo="primario" aoclicar={Salvar} >Salvar</BotaoCustomizado>







    </Principal>
    );
}

export default PaginaCadastroCliente;