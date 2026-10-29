import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import PaginaListaProdutos from "./paginas/PaginaListaProdutos/PaginaListaProdutos";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaginaListaTarefas from "./paginas/PaginaListaTarefas/PaginaListaTarefas";
import PaginaCadastroCliente from "./paginas/PaginaCadastroCliente/PaginaCadastroCliente";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "lista-produtos",
    element: <PaginaListaProdutos />,
  },
  {
    path: "fuscao-preto",
    element: <PaginaListaTarefas />,
  },
  {
    path: "cadastro-cliente",
    element: <PaginaCadastroCliente />,
  }
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;