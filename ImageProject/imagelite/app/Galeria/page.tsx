'use client'
import { Template } from "../Componente/template";

interface GaleriaProps {
  mensagem?: string;
  mensagemBotao?: string;
}

const Galeria = ({ mensagem, mensagemBotao }: GaleriaProps) => {

  const clique = () => {
    console.log("Você clicou no botão!");
    alert(mensagemBotao);
  }

  return (

      <div>
        <main className="dark:bg-black sm:items-start">
          <Template children={<>oi</>}>
      
          </Template>
          <h1>Galeria</h1>
          <p>{mensagem}</p>
          <button onClick={clique}>Clique aqui</button>
        </main>
      </div>
    
  );
}

export default Galeria;