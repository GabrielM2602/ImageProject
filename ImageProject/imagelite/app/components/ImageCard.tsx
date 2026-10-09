'use client';
import { useState } from 'react';

interface ImageCardProps {
  imageUrl?: string;
  imageName?: string;
  imageSize?: string;
  extension?: string;
  uploadDate?: string;
}


export const ImageCard: React.FC<ImageCardProps> = ({ imageName, imageUrl, imageSize, uploadDate, extension }) => {
  const [imageStatus, setImageStatus] = useState<
    'loading' | 'loaded' | 'error'
  >('loading');
  function downloadImage() {
    window.open(imageUrl, '_blank');
  }
  return (
    <div className="card relative bg-white rounded-md shadow-md transition-all ease-in-out duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56">
        <img
          onClick={downloadImage}
          src={imageUrl}
          className="h-full w-full object-cover rounded-t-md"
          alt={imageName ?? 'Imagem da galeria'}
          onLoad={() => setImageStatus('loaded')}
          onError={() => setImageStatus('error')}
        />

        {imageStatus === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100" role="status">
            Carregando imagem...
          </div>
        )}

        {imageStatus === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-600" role="alert">
            Não foi possível carregar esta imagem.
          </div>
        )}
      </div>      <div className="card-body p-4">
        <h1 className="text-xl font-semibold mb-2 text-gray-600">{imageName}</h1>
        <p className="text-xl font-semibold mb-2 text-gray-600">{formatBytes(Number(imageSize))}</p>
        <p className="text-xl font-semibold mb-2 text-gray-600">{extension}</p>
        <p className="text-xl font-semibold mb-2 text-gray-600">{uploadDate}</p>
      </div>
    </div>



  )

}
function formatBytes(bytes: number = 0, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const absBytes = Math.abs(bytes);

  // Evita estourar o tamanho do array sizes
  const i = Math.min(
    Math.floor(Math.log(absBytes) / Math.log(k)),
    sizes.length - 1
  );

  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedValue} ${sizes[i]}`;
}
