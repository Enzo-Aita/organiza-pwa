import { useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";

function PaginaListaTarefas() {
  const [descricaoTarefa, setDescricaoTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = () => {
    if (descricaoTarefa.trim()) {
      const novaTarefa = {id: Date.now(), descricao: descricaoTarefa};
      setTarefas([...tarefas, novaTarefa]);
      setDescricaoTarefa("");
    } else{
     alert("Tarefa Obrigatória.");
  }

  };

  return (
    <Principal titulo="Lista de Tarefas" voltarPara="/">
      <CampoCustomizado
        label="Tarefa"
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={descricaoTarefa}
        onChange={(e) => setDescricaoTarefa(e.target.value)}
      />

      <BotaoCustomizado tipo="primario" aoClicar={adicionarTarefa}>
        Adicionar Tarefa
      </BotaoCustomizado>

      {tarefas.map((item) => {
        return <div key={item.id}>{item.descricao}</div>;
      })}
    </Principal>
  );
}

export default PaginaListaTarefas;