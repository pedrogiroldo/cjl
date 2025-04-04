import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="Coral Jovem de Londrina" />
        <meta
          name="description"
          content="Com fé e propósito, damos voz à nossa missão. A mensagem do advento a todo mundo em nossa geração."
        />
        <meta
          name="keywords"
          content="Coral, Londrina, Música, Coral Jovem, CJL, Canto, Grupo Musical"
        />

        {/* Open Graph Meta Tags (For Social Media) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Coral Jovem de Londrina" />
        <meta
          property="og:description"
          content="Com fé e propósito, damos voz à nossa missão. A mensagem do advento a todo mundo em nossa geração."
        />
        <meta
          property="og:image"
          content="https://https://coraljovemlondrina.com.br//images/logo-fundo.webp"
        />
        <meta
          property="og:url"
          content="https://https://coraljovemlondrina.com.br/"
        />
        <meta property="og:site_name" content="Coral Jovem de Londrina" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coral Jovem de Londrina" />
        <meta
          name="twitter:description"
          content="Com fé e propósito, damos voz à nossa missão. A mensagem do advento a todo mundo em nossa geração."
        />
        <meta
          name="twitter:image"
          content="https://https://coraljovemlondrina.com.br//images/logo-fundo.webp"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
