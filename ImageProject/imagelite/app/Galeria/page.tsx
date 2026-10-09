'use client'

//import { Template } from '../components/Template';
//import { ImageCard } from '../components/Image';
import { Template, ImageCard, } from '@/components';
import { ImageService, useImageService } from '@/resource/service';
import { Image } from '@/resource/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';




export default function Galeria() {

  const useService = useImageService();

  const [images, setImages] = useState<Image[]>([]);

  const [query, setQuery] = useState<string>('');

  const [extension, setExtension] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const router = useRouter();

  async function searchImages() {
    setIsLoading(true);
    setError('');

    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
    } catch (cause) {
      console.error('Erro ao buscar imagens:', cause);
      setError('Não foi possível carregar as imagens. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  /*renderizando a imagem na tela*/
  function renderImageCard(image: Image) {
    return (
      <ImageCard key={image.url}
        imageName={image.name}
        imageUrl={image.url}
        imageSize={image.size}
        extension={image.extension}
        uploadDate={image.uploadDate}
      />
    )
  }

  function renderImageCards() {
    //return images.map((image) => renderImageCard(image));
    return images.map(renderImageCard);
  }


  return (
    <Template>

      <section className="flex flex-col items-center justify-center my-5">
        <div className="flex space-x-4">
          <input type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="border px-4 py-2 rounded-lg text-white-900" placeholder="Buscar imagens..." />
          <select onChange={event => setExtension(event.target.value)}
            className="border px-4 py-2 rounded-lg text-white-900">
            <option value="">All formats</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="GIF">GIF</option>
            <option value="JPEG">JPEG</option>

          </select>
          <button
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={searchImages}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Buscar'}
          </button>
          <Button
            type="button"
            variant="danger"
            onClick={() => router.push('/upload')}
          >
            Add New
          </Button>        
          
          </div>
      </section>

      <section className="grid grid-cols-3 gap-4 p-4">
        {isLoading ? (
          <p className="col-span-full text-center" role="status">
            Carregando imagens...
          </p>
        ) : error ? (
          <p className="col-span-full text-center text-red-600" role="alert">
            {error}
          </p>
        ) : images.length === 0 ? (
          <p className="col-span-full text-center">
            Nenhuma imagem encontrada.
          </p>
        ) : (
          renderImageCards()
        )}
      </section>

    </Template>
  );
} 