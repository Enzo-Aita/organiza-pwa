import { useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";

function PaginaListaTarefas() {
  const [descricaoTarefa, setDescricaoTarefa] = useState("");

  const adicionarTarefa = () => {};

  return (
    <Principal titulo="Liata de Tarefas" voltarPara="/">
      <input
        type="text"
        placeholder="Digite uma Tarefa"
        value={descricaoTarefa}
        onChange={(evento) => {
          setDescricaoTarefa(evento.target.value);
        }}
      />
      <BotaoCustomizado tipo="primario" aoClicar="{adicionarTarefa}">
        Adicionar Tarefa
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaListaTarefas;
