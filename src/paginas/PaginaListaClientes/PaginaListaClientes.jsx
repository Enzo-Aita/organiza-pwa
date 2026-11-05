import Principal from "../../componentes/Principal/Principal";
import { buscarClientes, salvarClientes, setClientes  } from "../../servicos/clientes.servico";
import "./PaginaListaClientes.css";
import { MdOutlineEmail } from "react-icons/md";    
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function PaginaListaClientes() {
  const navigate = useNavigate();
  const clientes = buscarClientes();
  
 const excluirCliente = (clienteParaExcluir) => {
  if ( confirm(`Deseja realmente excluir o cliente: ${clienteParaExcluir.nome}?`)){

    const clientesAtualizados = clientes.filter(
  (item) => item.id !== clienteParaExcluir.id,);
  setClientes(clientesAtualizados);
  salvarClientes(clientesAtualizados);
  localStorage.setItem("clientes", JSON.stringify(clientesAtualizados));
 }
 };
const editarCliente = (clienteParaEditar) => {
  navigate("/cadastro-cliente/" + clienteParaEditar.id);
}
  return (
    <Principal titulo="Lista de Clientes" voltarPara="/">
      {clientes.map((item, index) => {
        return (
          <div key={index} className="PaginaListaClientes_item">

            <div>
              <h3>{item.nome}</h3>
              <span className="PaginaListaClientes_item_email">
                <MdOutlineEmail />
                {item.email}
              </span>
            </div>

            <div className={"PaginaListaClientes_item_acoes"}>
              <MdEdit size={24} onClick={() => editarCliente(item)} />
              <MdDelete size={24} color="red" onClick={() => excluirCliente(item)} />
            </div>
          </div>
        );
      })}
    </Principal>
  );
}

export default PaginaListaClientes;
