'use client';
import { useEffect } from 'react';

interface LightboxProps {
  imageUrl?: string;
  imageName?: string;
  onClose: () => void;
}

export function Lightbox({ imageUrl, imageName, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={imageName ?? 'Imagem ampliada'}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-ink/90 p-4 backdrop-blur-sm"
    >
      <img
        src={imageUrl}
        alt={imageName ?? 'Imagem ampliada'}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-2xl"
      />
      <div className="flex max-w-full items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <p className="truncate font-display text-lg font-semibold text-white">{imageName}</p>
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25"
        >
          Abrir original
        </a>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mint"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
