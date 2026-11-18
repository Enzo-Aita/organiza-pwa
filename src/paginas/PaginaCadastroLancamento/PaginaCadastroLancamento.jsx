/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { toast } from "react-toastify";
import {
  buscarLancamentos,
  CATEGORIAS,
  salvarLancamento,
  TIPOS,
} from "../../servicos/lancamentos.servico";
import { useNavigate, useParams } from "react-router-dom";

function PaginaCadastroLancamento() {
  const navigate = useNavigate();
  const [formLancamento, setFormLancamento] = useState({
    id: "",
    descricao: "",
    tipo: "Despesa",
    categoria: CATEGORIAS[0].nome,
    valor: "",
    valorMeta: "",
  });

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const lancamentoParaEditar = buscarLancamentos().find(
        (item) => item.id === +params.id,
      );
      if (lancamentoParaEditar) {
        setFormLancamento(lancamentoParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    const valor = Number(formLancamento.valor);
    const valorMeta = Number(formLancamento.valorMeta);

    if (!formLancamento.descricao.trim()) {
      toast.error("O campo descrição é obrigatório!");
      return;
    }

    if (!valor || valor <= 0) {
      toast.error("Informe um valor maior que zero!");
      return;
    }

    if (formLancamento.tipo === "Meta" && (!valorMeta || valorMeta <= 0)) {
      toast.error("Informe o valor da meta!");
      return;
    }

    salvarLancamento({ ...formLancamento, valor: valor, valorMeta: valorMeta });
    toast.success("Lançamento salvo com sucesso!");
    navigate("/lista-lancamentos");
  };

  const titulo = formLancamento.id ? "Editar Lançamento" : "Novo Lançamento";

  return (
    <Principal titulo={titulo} voltarPara="/menu">
      <CampoCustomizado
        label="Descrição"
        placeholder="Ex.: Salário, Mercado, Viagem"
        value={formLancamento.descricao}
        onChange={(e) =>
          setFormLancamento({ ...formLancamento, descricao: e.target.value })
        }
        maxLength={40}
      />

      <div className="CampoCustomizado_root">
        <span>Tipo</span>
        <select
          className="CampoCustomizado_input"
          value={formLancamento.tipo}
          onChange={(e) =>
            setFormLancamento({ ...formLancamento, tipo: e.target.value })
          }
        >
          {TIPOS.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      {formLancamento.tipo === "Despesa" && (
        <div className="CampoCustomizado_root">
          <span>Categoria</span>
          <select
            className="CampoCustomizado_input"
            value={formLancamento.categoria}
            onChange={(e) =>
              setFormLancamento({ ...formLancamento, categoria: e.target.value })
            }
          >
            {CATEGORIAS.map((item) => {
              return (
                <option key={item.nome} value={item.nome}>
                  {item.nome}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <CampoCustomizado
        label={formLancamento.tipo === "Meta" ? "Valor guardado" : "Valor"}
        type="number"
        step="0.01"
        placeholder="Digite o valor:"
        value={formLancamento.valor}
        onChange={(e) =>
          setFormLancamento({ ...formLancamento, valor: e.target.value })
        }
      />

      {formLancamento.tipo === "Meta" && (
        <CampoCustomizado
          label="Valor da meta"
          type="number"
          step="0.01"
          placeholder="Quanto você quer juntar?"
          value={formLancamento.valorMeta}
          onChange={(e) =>
            setFormLancamento({ ...formLancamento, valorMeta: e.target.value })
          }
        />
      )}

      <BotaoCustomizado tipo="primario" aoClicar={salvar}>
        SALVAR
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroLancamento;