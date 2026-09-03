import './App.css'
import Cabecalho from './componentes/Cabecalho/Cabecalho'
import Rodape from './Rodape/Rodape'
import Principal from './Principal/Principal'

function App() {
  return (
    <div>
      <Cabecalho/>
      <header>Cabeçalho</header>
      <Principal/>
      <main>Conteúdo principal</main>
      <Rodape/>
      <footer>Rodapé</footer>
    </div>
    

  )
}

export default App
