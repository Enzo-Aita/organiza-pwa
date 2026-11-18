import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaMenu from "./paginas/PaginaMenu/PaginaMenu";
import PaginaDashboard from "./paginas/PaginaDashboard/PaginaDashboard";
import PaginaListaLancamentos from "./paginas/PaginaListaLancamentos/PaginaListaLancamentos";
import PaginaCadastroLancamento from "./paginas/PaginaCadastroLancamento/PaginaCadastroLancamento";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaDashboard />,
  },
  {
    path: "menu",
    element: <PaginaMenu />,
  },
  {
    path: "lista-lancamentos",
    element: <PaginaListaLancamentos />,
  },
  {
    path: "cadastro-lancamento/:id?",
    element: <PaginaCadastroLancamento />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;