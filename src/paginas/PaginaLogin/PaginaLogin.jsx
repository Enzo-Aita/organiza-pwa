import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { buscarClientes } from "../../servicos/clientes.servico";
import { salvarNoLocalStorage } from "../../servicos/localstorage.servico";
import logo from "../../assets/logo.png";
import "./PaginaLogin.css";

function PaginaLogin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = () => {
    if (!usuario.trim() || !senha.trim()) {
      toast.error("Preencha o usuário e a senha!");
      return;
    }

    const clienteEncontrado = buscarClientes().find(
      (item) => item.email === usuario && item.senha === senha,
    );

    if (!clienteEncontrado) {
      toast.error("Usuário ou senha incorretos!");
      return;
    }

    salvarNoLocalStorage("usuarioLogado", clienteEncontrado.id);
    navigate("/dashboard");
  };

  return (
    <Principal titulo="Seja Bem Vindo">
      <img src={logo} alt="Logo Organiza" className="PaginaLogin_logo" />

      <CampoCustomizado
        label="Usuário"
        placeholder="Digite seu email:"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <CampoCustomizado
        label="Senha"
        type="password"
        placeholder="Digite sua senha:"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <BotaoCustomizado tipo="primario" aoClicar={fazerLogin}>
        LOGIN
      </BotaoCustomizado>

      <span className="PaginaLogin_cadastrar">
        Não tem conta? <Link to="/cadastro-cliente">Cadastrar</Link>
      </span>

      <span className="PaginaLogin_esqueciSenha">
        Esqueceu sua senha? <Link to="/recuperar-senha">Recuperar</Link>
      </span>

    </Principal>
  );
}

export default PaginaLogin;
