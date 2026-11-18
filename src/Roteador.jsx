import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaMenu from "./paginas/PaginaMenu/PaginaMenu";
import PaginaDashboard from "./paginas/PaginaDashboard/PaginaDashboard";
import PaginaCadastroCliente from "./paginas/PaginaCadastroCliente/PaginaCadastroCliente";
import PaginaListaClientes from "./paginas/PaginaListaClientes/PaginaListaClientes";
// PARTE 2 import PaginaLogin from "./paginas/PaginaLogin/PaginaLogin";
// PARTE 2 PERFIL

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaDashboard />,
  },
  {
    path: "menu",
    element: <PaginaMenu />,
  },
  // {
  //   path: "cadastro-cliente/:id?",
  //   element: <PaginaCadastroCliente />,
  // },
  // {
  //   path: "lista-clientes",
  //   element: <PaginaListaClientes />,
  // }, 
  // {
  //   path: "",
  //   element: <PaginaLogin />,
  // }
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;