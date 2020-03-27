import React from 'react';

import './global.css';

import Routes from './routes';

//, {useState}
//import Logon from './pages/Logon';
//import Header from './Header';

function App() {

  //Código de exemplo
  // useState: retorna um array onde [valor, funçãoDeAtualização] 
  // com o React não é possível manipular de forma manual/direta os valores
  // de uma variável
  // let [counter,setCounter] = useState(0);
  //  function increment(){
  //    setCounter(counter + 1);
  //  }
  //<Header> Contador: {counter} </Header>
  //<button onClick={increment}> Incrementar</button>

  return (
    <div>
    <Routes/>
    </div>
  );
}

export default App;
