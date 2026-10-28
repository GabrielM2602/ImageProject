'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Template, ImageCard, Button, Lightbox, buttonBase, buttonClasses } from '@/components';
import { useImageService } from '@/resource/service';
import { Image } from '@/resource/image';

const formats = [
  { value: '', label: 'Todos' },
  { value: 'JPG', label: 'JPG' },
  { value: 'PNG', label: 'PNG' },
  { value: 'GIF', label: 'GIF' },
  { value: 'JPEG', label: 'JPEG' },
];

export default function Galeria() {
  const useService = useImageService();

  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [extension, setExtension] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Image | null>(null);

  const closeLightbox = useCallback(() => setSelected(null), []);

  async function searchImages() {
    setIsLoading(true);
    setError('');

    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
    } catch (cause) {
      console.error('Erro ao buscar imagens:', cause);
      setError('Não foi possível carregar as imagens. Verifique se o servidor está no ar e tente de novo.');
    } finally {
      setIsLoading(false);
    }
  }

  // Carrega as imagens assim que a página abre
  useEffect(() => {
    searchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchImages();
  }

  return (
    <Template>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight">Galeria</h1>
            <p className="mt-1 text-muted" role="status">
              {isLoading ? 'Buscando imagens...' : `${images.length} ${images.length === 1 ? 'imagem' : 'imagens'}`}
            </p>
          </div>
          <Link href="/upload" className={`${buttonBase} ${buttonClasses.primary}`}>
            Enviar imagem
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar pelo nome da imagem"
              aria-label="Buscar imagens"
              className="h-11 w-full rounded-lg border border-line bg-white pl-11 pr-3.5 placeholder:text-muted/60 focus:border-forest"
            />
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por formato">
            {formats.map(({ value, label }) => (
              <button
                key={label}
                type="button"
                aria-pressed={extension === value}
                onClick={() => setExtension(value)}
                className={`h-11 rounded-lg border px-4 text-sm font-semibold transition-colors ${
                  extension === value
                    ? 'border-forest bg-mint text-forest-deep'
                    : 'border-line bg-white text-muted hover:border-forest hover:text-forest'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </Button>
        </form>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-line bg-white p-2">
                <div className="aspect-[4/3] rounded-md bg-line/60" />
                <div className="mx-1.5 mb-2 mt-4 h-4 w-2/3 rounded bg-line/60" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-alert/30 bg-alert/5 p-8 text-center" role="alert">
            <p className="text-alert">{error}</p>
            <Button type="button" variant="secondary" className="mt-4" onClick={searchImages}>
              Tentar de novo
            </Button>
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line p-12 text-center">
            <p className="font-display text-xl font-semibold">Nenhuma imagem encontrada</p>
            <p className="mt-1 text-muted">Mude a busca ou o formato, ou envie uma nova imagem.</p>
            <Link href="/upload" className={`${buttonBase} ${buttonClasses.primary} mt-5`}>
              Enviar imagem
            </Link>
          </div>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <ImageCard
                key={image.url}
                imageName={image.name}
                imageUrl={image.url}
                imageSize={image.size}
                extension={image.extension}
                uploadDate={image.uploadDate}
                onOpen={() => setSelected(image)}
              />
            ))}
          </section>
        )}
      </div>

      {selected && (
        <Lightbox imageUrl={selected.url} imageName={selected.name} onClose={closeLightbox} />
      )}
    </Template>
  );
}
