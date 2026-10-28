'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button, Input, Template } from '@/components';
import { useImageService } from '@/resource/service';

export default function UploadPage() {
  const imageService = useImageService();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Gera a pré-visualização do arquivo escolhido
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const imageName = name.trim();
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!imageName) {
      setError('Informe o nome da imagem.');
      return;
    }
    if (!file) {
      setError('Selecione um arquivo de imagem.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 20 MB.');
      return;
    }
    if (tags.length === 0) {
      setError('Informe pelo menos uma tag.');
      return;
    }

    setIsLoading(true);
    try {
      await imageService.enviar(file, imageName, tags);
      setSuccess(true);
      setName('');
      setFile(null);
      setTagsText('');
      formRef.current?.reset();
    } catch (cause) {
      console.error('Erro ao enviar imagem:', cause);
      setError(
        cause instanceof Error
          ? cause.message
          : 'Não foi possível enviar a imagem.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Template>
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Enviar imagem</h1>
        <p className="mt-1 text-muted">Escolha o arquivo, dê um nome e adicione tags para achá-lo depois.</p>

        <form
          ref={formRef}
          className="mt-8 flex flex-col gap-5 rounded-xl border border-line bg-white p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">Arquivo</span>
            <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-line bg-paper transition-colors focus-within:border-forest hover:border-forest">
              {preview ? (
                <>
                  <img src={preview} alt="Pré-visualização" className="max-h-72 w-full object-contain" />
                  <span className="absolute bottom-2 left-2 right-2 truncate rounded-md bg-ink/80 px-3 py-1.5 text-sm text-white">
                    {file?.name}
                  </span>
                </>
              ) : (
                <div className="px-6 text-center">
                  <svg className="mx-auto size-9 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                  </svg>
                  <p className="mt-3 font-semibold">Clique ou arraste uma imagem até aqui</p>
                  <p className="mt-1 text-sm text-muted">PNG, JPG, JPEG ou GIF, com até 20 MB</p>
                </div>
              )}
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.gif"
                aria-label="Arquivo (PNG, JPG, JPEG ou GIF; máximo de 20 MB)"
                onChange={(event) => setFile(event.currentTarget.files?.[0] ?? null)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                required
              />
            </div>
          </div>

          <Input
            label="Nome da imagem"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <Input
            label="Tags"
            hint="Separe as tags por vírgula."
            value={tagsText}
            onChange={(event) => setTagsText(event.target.value)}
            placeholder="natureza, viagem"
            required
          />

          {error && (
            <p className="rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-alert" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg border border-forest/30 bg-mint/50 px-4 py-3 text-forest-deep" role="status">
              Imagem enviada com sucesso!{' '}
              <Link className="font-semibold underline" href="/galeria">Ver na galeria</Link>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar imagem'}
            </Button>
            <Link className="px-2 py-2 text-sm font-semibold text-muted hover:text-ink" href="/galeria">
              Voltar para a galeria
            </Link>
          </div>
        </form>
      </div>
    </Template>
  );
}
