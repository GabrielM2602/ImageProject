'use client';
import { useState } from 'react';

interface ImageCardProps {
  imageUrl?: string;
  imageName?: string;
  imageSize?: string;
  extension?: string;
  uploadDate?: string;
  onOpen?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageName,
  imageUrl,
  imageSize,
  uploadDate,
  extension,
  onOpen,
}) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white p-2 transition-shadow duration-200 hover:shadow-lg">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar ${imageName ?? 'imagem'}`}
        className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-md bg-paper"
      >
        <img
          src={imageUrl}
          className="h-full w-full object-cover"
          alt={imageName ?? 'Imagem da galeria'}
          onLoad={() => setImageStatus('loaded')}
          onError={() => setImageStatus('error')}
        />

        {imageStatus === 'loading' && (
          <div className="absolute inset-0 animate-pulse bg-line/60" role="status" aria-label="Carregando imagem" />
        )}

        {imageStatus === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-paper p-4 text-center text-sm text-alert" role="alert">
            Não foi possível carregar esta imagem.
          </div>
        )}
      </button>

      <div className="px-1.5 pb-1.5 pt-3">
        <h2 className="truncate font-display text-base font-semibold" title={imageName}>
          {imageName}
        </h2>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-muted">
          {extension && (
            <span className="rounded bg-mint px-1.5 py-0.5 text-xs font-semibold text-forest-deep">
              {extension}
            </span>
          )}
          <span>{formatBytes(Number(imageSize))}</span>
          <span className="ml-auto">{formatDate(uploadDate)}</span>
        </p>
      </div>
    </article>
  );
};

function formatDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  return isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR');
}

function formatBytes(bytes: number = 0, decimals: number = 2): string {
  if (!bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.min(
    Math.floor(Math.log(Math.abs(bytes)) / Math.log(k)),
    sizes.length - 1
  );

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
