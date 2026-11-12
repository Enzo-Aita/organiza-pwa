import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaListaProdutos from "./paginas/PaginaListaProdutos/PaginaListaProdutos";
import PaginaListaTarefas from "./paginas/PaginaListaTarefas/PaginaListaTarefas";
import PaginaCadastroCliente from "./paginas/PaginaCadastroCliente/PaginaCadastroCliente";
import PaginaListaClientes from "./paginas/PaginaListaClientes/PaginaListaClientes";
import PaginaLogin from "./paginas/PaginaLogin/PaginaLogin";
const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaLogin />,
  },
  {
    path: "lista-produtos",
    element: <PaginaListaProdutos />,
  },
  {
    path: "lista-tarefas",
    element: <PaginaListaTarefas />,
  },
  {
    path: "cadastro-cliente/:id?",
    element: <PaginaCadastroCliente />,
  },
  {
    path: "lista-clientes",
    element: <PaginaListaClientes />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;