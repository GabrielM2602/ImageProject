import Link from "next/link";
import { Template, buttonBase, buttonClasses } from "@/components";

const facts = [
  { title: "Formatos aceitos", text: "PNG, JPG, JPEG e GIF" },
  { title: "Tamanho máximo", text: "20 MB por arquivo" },
  { title: "Busca", text: "Por nome e por formato" },
];

export default function Home() {
  return (
    <Template>
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <div className="crop frame-in p-8 md:p-16">
          <i /><i /><i /><i />

          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
            Suas imagens, simples e organizadas.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Envie, busque e visualize suas imagens em um só lugar.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/galeria" className={`${buttonBase} ${buttonClasses.primary}`}>
              Ver galeria
            </Link>
            <Link href="/upload" className={`${buttonBase} ${buttonClasses.secondary}`}>
              Enviar imagem
            </Link>
          </div>

          <dl className="mt-16 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            {facts.map(({ title, text }) => (
              <div key={title}>
                <dt className="text-sm text-muted">{title}</dt>
                <dd className="mt-1 font-display text-lg font-semibold">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Template>
  );
}
