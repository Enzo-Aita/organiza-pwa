/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import {
  formatarComMascara,
  MASCARA_CPF,
  MASCARA_TELEFONE,
} from "../../utils/formatarComMascara";
import { toast } from "react-toastify";
import validarCPF from "../../utils/validarCPF";
import validarEmail from "../../utils/validarEmail";
import { buscarClientes, salvarCliente } from "../../servicos/clientes.servico";
import { useParams } from "react-router-dom";

function PaginaCadastroCliente() {
   const [formCliente, setFormCliente] = useState({
    id: "",
    nome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    cpf: ""
  });

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const clientesParaEditar = buscarClientes().find(
        (item) => item.id === +params.id,
      );
      
      if (clientesParaEditar) {
        setFormCliente(clientesParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (!nome.trim() || !email.trim()) {
      toast.error("Os campos nome e email são obrigatórios!");
      return;
    }

    if (!validarEmail(email)) {
      toast.error("Email inválido!");
      return;
    }

    if (cpf.trim() && !validarCPF(cpf)) {
      toast.error("CPF inválido!");
      return;
    }

    const cliente = {
      nome,
      email,
      dataNascimento,
      telefone,
      cpf,
    };
    console.log(cliente);
    salvarCliente(cliente);
    toast.success("Cliente salvo com sucesso!");
  };

  return (
    <Principal titulo="Novo Cliente" voltarPara="/">
      <CampoCustomizado
        label="Nome"
        value={formCliente.nome}
        onChange={(e) => setFormCliente({...formCliente, nome: e.target.value})}
        maxLength={50}
      />
      <CampoCustomizado
        label="Email"
        value={formCliente.email}
        onChange={(e) => setFormCliente({...formCliente, email: e.target.value})}
      />
      <CampoCustomizado
        label="Data Nascimento"
        type="date"
        value={formCliente.dataNascimento}
        onChange={(e) => setFormCliente({...formCliente, dataNascimento: e.target.value})}
      />
      <CampoCustomizado
        label="Telefone"
        type="tel"
        value={formCliente.telefone}
        onChange={(e) =>
          setFormCliente({...formCliente, telefone: formatarComMascara(e.target.value, MASCARA_TELEFONE)})
        }
      />
      <CampoCustomizado
        label="CPF"
        value={formCliente.cpf}
        onChange={(e) =>
          setFormCliente({...formCliente, cpf: formatarComMascara(e.target.value, MASCARA_CPF)})
        }
      />

      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroCliente;
