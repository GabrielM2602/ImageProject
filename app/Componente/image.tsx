export const ImageCard : React.FC=() => {
  return (
    <div className="card relative bg-white rounded-lg shadow-md transition-transform esse-in duration-300 transform hover:shadow-lg translate-y-2">
      <img src="link" alt="Imagem" className="h-56 w-full object-cover rounded-md"  />
        <div className="card-body p-4">
            <h1 className="text-lg font-semibold mb-2 text-gray-600">Título da Imagem</h1>
            <p className="text-lg font-semibold mb-2 text-gray-600">Tamanho</p>
            <p className="text-lg font-semibold mb-2 text-gray-600">Data de Upload</p>
        </div>
    </div>
  )
}