import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdVisibility,
  MdVisibilityOff,
  MdArrowUpward,
  MdArrowDownward,
  MdAttachMoney,
  MdEdit,
} from "react-icons/md";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { salvarNoLocalStorage } from "../../servicos/localstorage.servico";
import {
  buscarLancamentos,
  CATEGORIAS,
} from "../../servicos/lancamentos.servico";
import "./PaginaDashboard.css";

function PaginaDashboard() {
  const navigate = useNavigate();
  const [mostrarValores, setMostrarValores] = useState(true);

  const lancamentos = buscarLancamentos();
  const receitas = lancamentos.filter((item) => item.tipo === "Receita");
  const despesas = lancamentos.filter((item) => item.tipo === "Despesa");
  const metas = lancamentos.filter((item) => item.tipo === "Meta");

  let totalReceitas = 0;
  receitas.forEach((item) => {
    totalReceitas += item.valor;
  });

  let totalDespesas = 0;
  despesas.forEach((item) => {
    totalDespesas += item.valor;
  });

  const saldo = totalReceitas - totalDespesas;

  const totalDaCategoria = (nomeCategoria) => {
    let total = 0;
    despesas.forEach((item) => {
      if (item.categoria === nomeCategoria) {
        total += item.valor;
      }
    });
    return total;
  };

  const formatarValor = (valor) => {
    if (!mostrarValores) {
      return "*****";
    }
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const sair = () => {
    salvarNoLocalStorage("usuarioLogado", null);
    navigate("/");
  };

  return (
    <Principal titulo="Dashboard">
      <div className="PaginaDashboard_topo">
        <MdMenu
          size={28}
          cursor="pointer"
          onClick={() => navigate("/menu")}
        />
        {mostrarValores ? (
          <MdVisibility
            size={24}
            cursor="pointer"
            onClick={() => setMostrarValores(false)}
          />
        ) : (
          <MdVisibilityOff
            size={24}
            cursor="pointer"
            onClick={() => setMostrarValores(true)}
          />
        )}
      </div>

      <div className="PaginaDashboard_cartao PaginaDashboard_resumo">
        <div className="PaginaDashboard_resumo-item">
          <span>Receita</span>
          <MdArrowUpward color="green" />
          <strong>{formatarValor(totalReceitas)}</strong>
        </div>
        <div className="PaginaDashboard_resumo-item">
          <span>Despesas</span>
          <MdArrowDownward color="red" />
          <strong>{formatarValor(totalDespesas)}</strong>
        </div>
        <div className="PaginaDashboard_resumo-item">
          <span>Saldo</span>
          <MdAttachMoney />
          <strong>{formatarValor(saldo)}</strong>
        </div>
      </div>

      <div className="PaginaDashboard_cartao">
        <h3>Resumo Despesas:</h3>
        {totalDespesas > 0 && (
          <div className="PaginaDashboard_grafico">
            {CATEGORIAS.map((item) => {
              return (
                <div
                  key={item.nome}
                  style={{
                    backgroundColor: item.cor,
                    flex: totalDaCategoria(item.nome),
                  }}
                />
              );
            })}
          </div>
        )}

        {CATEGORIAS.map((item) => {
          return (
            <div key={item.nome} className="PaginaDashboard_linha">
              <span>
                <span
                  className="PaginaDashboard_bolinha"
                  style={{ backgroundColor: item.cor }}
                />
                {item.nome}:
              </span>
              <span>{formatarValor(totalDaCategoria(item.nome))}</span>
            </div>
          );
        })}
      </div>

      <div className="PaginaDashboard_cartao">
        <h3>Metas:</h3>

        {metas.map((item) => {
          let porcentagem = (item.valor / item.valorMeta) * 100;
          if (porcentagem > 100) {
            porcentagem = 100;
          }
          return (
            <div key={item.id} className="PaginaDashboard_meta">
              <div className="PaginaDashboard_linha">
                <span>{item.descricao}</span>
                <span className="PaginaDashboard_meta-valor">
                  {formatarValor(item.valor)} de {formatarValor(item.valorMeta)}
                  <MdEdit
                    size={20}
                    cursor="pointer"
                    onClick={() => navigate("/cadastro-lancamento/" + item.id)}
                  />
                </span>
              </div>
              <div className="PaginaDashboard_barra">
                <div
                  className="PaginaDashboard_barra-preenchida"
                  style={{ width: porcentagem + "%" }}
                />
              </div>
            </div>
          );
        })}

        {!metas.length && <span>Nenhuma meta cadastrada.</span>}
      </div>

      {/* <BotaoCustomizado tipo="perigo" aoClicar={sair}>
        SAIR
      </BotaoCustomizado> */}
    </Principal>
  );
}

export default PaginaDashboard;