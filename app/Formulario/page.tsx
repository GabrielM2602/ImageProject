'use client'

interface FormularioProps {
  mensagem?: string;
  mensagemBotao?: string;
}

const Formulario = ({ mensagem, mensagemBotao }: FormularioProps) => {

  const clique = () => {
    console.log("Você clicou no botão!");
    alert(mensagemBotao);
  }

  return (
    <div>
      <h1>Formulario</h1>
      <p>{mensagem}</p>
      <button onClick={clique}>Clique aqui</button>
    </div>
  );
}

export default Formulario;