import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import {
  buscarLancamentos,
  excluirLancamento,
} from "../../servicos/lancamentos.servico";

import "./PaginaListaLancamentos.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";

const formatarDinheiro = (valor) => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

function PaginaListaLancamentos() {
  const navigate = useNavigate();
  const [lancamentos, setLancamentos] = useState(buscarLancamentos());
  const [termoBusca, setTermoBusca] = useState("");

  const excluir = (lancamentoParaExcluir) => {
    if (confirm(`Deseja excluir o lançamento: ${lancamentoParaExcluir.descricao}?`)) {
      const lancamentosAtualizados = excluirLancamento(lancamentoParaExcluir.id);
      setLancamentos(lancamentosAtualizados);
      toast.success("Lançamento excluído com sucesso!");
    }
  };

  const editar = (lancamentoParaEditar) => {
    navigate("/cadastro-lancamento/" + lancamentoParaEditar.id);
  };

  const lancamentosFiltrados = lancamentos.filter((item) => {
    const termo = termoBusca.toLowerCase();
    return (
      item.descricao.toLowerCase().includes(termo) ||
      item.tipo.toLowerCase().includes(termo)
    );
  });

  return (
    <Principal titulo="Lançamentos" voltarPara="/menu">
      <CampoCustomizado
        type="search"
        label="Buscar Lançamento"
        placeholder="Digite a descrição ou o tipo..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      {lancamentosFiltrados.map((item) => {
        return (
          <div key={item.id} className="PaginaListaLancamentos_item">
            <div>
              <h3>{item.descricao}</h3>
              <span>
                {item.tipo}
                {item.tipo === "Despesa" && " - " + item.categoria}
              </span>
            </div>

            <div className="PaginaListaLancamentos_item_acoes">
              {item.tipo === "Meta" ? (
                <span>
                  {formatarDinheiro(item.valor)} de{" "}
                  {formatarDinheiro(item.valorMeta)}
                </span>
              ) : (
                <span style={{ color: item.tipo === "Receita" ? "green" : "red" }}>
                  {formatarDinheiro(item.valor)}
                </span>
              )}
              <MdEdit size={24} onClick={() => editar(item)} />
              <MdDelete size={24} color="red" onClick={() => excluir(item)} />
            </div>
          </div>
        );
      })}

      {!lancamentosFiltrados.length && (
        <span className="PaginaListaLancamentos_vazia">
          Nenhum lançamento encontrado.
        </span>
      )}

      <div className="PaginaListaLancamentos_botaoAdicionar">
        <MdAdd onClick={() => navigate("/cadastro-lancamento")} />
      </div>
    </Principal>
  );
}

export default PaginaListaLancamentos;