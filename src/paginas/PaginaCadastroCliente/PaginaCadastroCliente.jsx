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
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroCliente() {
  const navigate = useNavigate();
  const [formCliente, setFormCliente] = useState({
    id: "",
    nome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    cpf: "",
    senha: "",
  });

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const clienteParaEditar = buscarClientes().find(
        (item) => item.id === +params.id,
      );
      if (clienteParaEditar) {
        setFormCliente(clienteParaEditar);
      }
    }
  }, [params.id]);

  const CriarConta = () => {
    if (!formCliente.nome.trim() || !formCliente.email.trim()) {
      toast.error("Os campos nome e email são obrigatórios!");
      return;
    }

    if (!validarEmail(formCliente.email)) {
      toast.error("Email inválido!");
      return;
    }

    if (formCliente.cpf.trim() && !validarCPF(formCliente.cpf)) {
      toast.error("CPF inválido!");
      return;
    }

    salvarCliente(formCliente);
    toast.success("Cliente salvo com sucesso!");
    navigate("/lista-clientes");
  };

  const titulo = formCliente.id ? "Editar Cliente" : "Cadastre-se";

  return (
    <Principal titulo={titulo} voltarPara="/">
      <CampoCustomizado
        label="Nome Completo"
        placeholder="Digite seu nome completo:"
        value={formCliente.nome}
        onChange={(e) =>
          setFormCliente({ ...formCliente, nome: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Data Nascimento"
        type="date"
        value={formCliente.dataNascimento}
        onChange={(e) =>
          setFormCliente({ ...formCliente, dataNascimento: e.target.value })
        }
      />
      <CampoCustomizado
        label="Senha"
        type="password"
        placeholder="Digite sua senha:"
        value={formCliente.senha}
        onChange={(e) =>
          setFormCliente({ ...formCliente, senha: e.target.value })
        }
      />
      <CampoCustomizado
        label="Email"
        placeholder="Digite seu email:"
        value={formCliente.email}
        onChange={(e) =>
          setFormCliente({ ...formCliente, email: e.target.value })
        }
        maxLength={50}
      />
      <CampoCustomizado
        label="Telefone"
        placeholder="Digite seu telefone:"
        type="tel"
        value={formCliente.telefone}
        onChange={(e) =>
          setFormCliente({
            ...formCliente,
            telefone: formatarComMascara(e.target.value, MASCARA_TELEFONE),
          })
        }
      />
      <CampoCustomizado
        label="CPF"
        placeholder="Digite seu CPF:"
        value={formCliente.cpf}
        onChange={(e) =>
          setFormCliente({
            ...formCliente,
            cpf: formatarComMascara(e.target.value, MASCARA_CPF),
          })
        }
      />
      <CampoCustomizado
        type="file"
        accept="image/*"
        label="Foto"
        onChange={(e) => {
          const imagem = e.target.files[0];
          if (imagem) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setFormCliente({ ...formCliente, foto: event.target.result });
            };
            reader.readAsDataURL(imagem);
          }
        }}
      />

      {formCliente.foto && (
        <div>
          <img
            src={formCliente.foto}
            alt="Foto do Cliente"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <BotaoCustomizado tipo="primario" aoClicar={CriarConta}>
        CRIAR CONTA
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroCliente;
