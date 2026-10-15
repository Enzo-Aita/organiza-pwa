import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";

function PaginaListaTarefas() {
  return (
    <Principal titulo="Liata de Tarefas" voltarPara="/">
      <input type="text" placeholder="Digite uma Tarefa"></input>
      <BotaoCustomizado tipo="primario" aoClicar="{adicionarTarefa}">
        Adicionar Tarefa
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaListaTarefas;
