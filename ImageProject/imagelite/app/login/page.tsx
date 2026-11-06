'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Template } from '@/components';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Informe um e-mail válido.');
      return;
    }
    if (!password) {
      setError('Informe sua senha.');
      return;
    }

    setIsLoading(true);

    // Somente visual: aqui é onde, no futuro, entraria a chamada ao servidor.
    setTimeout(() => {
      router.push('/galeria');
    }, 600);
  }

  return (
    <Template>
      <div className="mx-auto max-w-md px-6 py-12 md:py-20">
        <div className="crop bg-white p-8 md:p-10">
          <i /><i /><i /><i />

          <h1 className="font-display text-4xl font-semibold tracking-tight">Entrar</h1>
          <p className="mt-1 text-muted">Acesse sua conta para gerenciar suas imagens.</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@exemplo.com"
              required
            />

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold">Senha</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 w-full rounded-lg border border-line bg-white pl-3.5 pr-20 transition-colors focus:border-forest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-pressed={showPassword}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-3 py-1.5 text-sm font-semibold text-muted hover:text-forest"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-lg border border-alert/30 bg-alert/5 px-4 py-3 text-alert" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </Template>
  );
}