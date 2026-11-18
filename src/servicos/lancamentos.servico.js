import {
  buscarNoLocalStorage,
  salvarNoLocalStorage,
} from "./localstorage.servico";

export const TIPOS = ["Receita", "Despesa", "Meta"];

export const CATEGORIAS = [
  { nome: "Alimentação", cor: "#29d8d5" },
  { nome: "Aluguel", cor: "#fc3766" },
  { nome: "Lazer", cor: "#ffd045" },
  { nome: "Outros", cor: "#365069" },
];

export const salvarLancamento = (lancamento) => {
  const lancamentos = buscarNoLocalStorage("lancamentos") || [];
  if (!lancamento.id) {
    lancamento.id = Date.now();
    lancamentos.push(lancamento);
  } else {
    const index = lancamentos.findIndex((item) => item.id === lancamento.id);
    lancamentos[index] = lancamento;
  }

  salvarNoLocalStorage("lancamentos", lancamentos);
};

export const buscarLancamentos = () => {
  return buscarNoLocalStorage("lancamentos") || [];
};

export const excluirLancamento = (id) => {
  const lancamentosAtualizados = buscarLancamentos().filter(
    (item) => item.id !== id,
  );
  salvarNoLocalStorage("lancamentos", lancamentosAtualizados);
  return lancamentosAtualizados;
};