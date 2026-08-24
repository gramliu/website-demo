import type { AppProps } from "next/app";
import { Noto_Sans_Mono, Open_Sans, Roboto_Slab } from "next/font/google";
import Head from "next/head";
import "../styles/global.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-sans-mono",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gram Liu</title>
        <meta
          name="description"
          content="Developer, engineer, and tech enthusiast building products from payments to AI agents."
        />
        <meta property="og:title" content="Gram Liu" />
        <meta
          property="og:description"
          content="Developer, engineer, and tech enthusiast building products from payments to AI agents."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/landing-tower.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${openSans.variable} ${notoSansMono.variable} ${robotoSlab.variable} font-sans`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
