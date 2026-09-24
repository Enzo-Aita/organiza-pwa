import "./Principal.css";
import BotaoCustomizado from "../Botao/botaoCustomizado";

function Principal() {
  return (
    <main className="Principal_root">
      Conteúdo principal
      <BotaoCustomizado
        tipo="primario"
        aoClicar={() => alert("Salvar clicado!")}
      >
        Salvar
      </BotaoCustomizado>
      <BotaoCustomizado tipo="secundario">Cancelar</BotaoCustomizado>
      <BotaoCustomizado>Enviar</BotaoCustomizado>
    </main>
  );
}

export default Principal;