import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#080808",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Cabeçalho */}
      <header
        style={{
          height: "60px",
          backgroundColor: "#155c2d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 50px",
        }}
      >
        <h2 style={{ alignItems: "center" }}>ImageLite</h2>

      </header>

      {/* Conteúdo principal */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <h1
            style={{
              fontSize: "56px",
              marginBottom: "20px",
            }}
          >
            Suas imagens,
            <br />
            <span style={{ color: "#35a853" }}>simples e organizadas.</span>
          </h1>

          <p
            style={{
              color: "#aaa",
              fontSize: "18px",
              lineHeight: "1.6",
              marginBottom: "35px",
            }}
          >
            Encontre, visualize e organize suas imagens de forma rápida
            e prática com o ImageLite.
          </p>

          {/* Botões */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <Link
              href="/galeria"
              style={{
                backgroundColor: "#2878f0",
                color: "white",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Ver galeria
            </Link>

            <Link
              href="/adicionar"
              style={{
                backgroundColor: "#e9363f",
                color: "white",
                padding: "14px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Adicionar imagem
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer
        style={{
          backgroundColor: "#155c2d",
          textAlign: "center",
          padding: "15px",
          color: "#ddd",
        }}
      >
        Desenvolvido por Gabriel
      </footer>
    </main>
  );
}
