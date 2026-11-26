import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";

import { useNavigate } from "react-router-dom";

function PaginaMenu() {
  const navigate = useNavigate();

  return (
    <Principal titulo="Menu" voltarPara="/">
      <BotaoCustomizado
        tipo="primario"
        aoClicar={() => navigate("/cadastro-lancamento")}
      >
        Novo Lançamento
      </BotaoCustomizado>

      <BotaoCustomizado
        tipo="primario"
        aoClicar={() => navigate("/lista-lancamentos")}
      >
        Lista de Lançamentos
      </BotaoCustomizado>
      
    </Principal>
  );
}

export default PaginaMenu;