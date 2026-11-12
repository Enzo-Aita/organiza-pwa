import "./Rodape.css";

function Rodape() {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className="Rodape_root">
      <span>Copyright © {anoAtual} - Todos os direitos reservados</span>
    </footer>

    // <footer className="Rodape_root_login">
    //   <span>Não tem conta? <Link to="/cadastro-cliente">Cadastrar</Link></span>
    // </footer>
  );

}

export default Rodape;