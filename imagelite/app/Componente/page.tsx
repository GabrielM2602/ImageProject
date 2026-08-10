'use client'
export default function Componente() {

      function clique () {
      alert("Você clicou no botão!");
    }

  return (

    <div>
      <h1>Primeiro Componente</h1>
      <button onClick={clique}>Clique aqui</button>
    </div>

  );
}