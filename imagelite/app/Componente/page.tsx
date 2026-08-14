'use client'

interface ComponenteProps {
  mensagem?: string;
  mensagemBotao?: string;
}

const Componente = ({ mensagem, mensagemBotao }: ComponenteProps) => {

  const clique = () => {
    console.log("Você clicou no botão!");
    alert(mensagemBotao);
  }

  return (
    <div>
      <h1>Primeiro Componente</h1>
      <p>{mensagem}</p>
      <button onClick={clique}>Clique aqui</button>
    </div>
  );
}

export default Componente;