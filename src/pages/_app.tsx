import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/global.css';
import { WordProvider } from '@/context/useWord';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta key='charset' charSet='utf-8' />
        <meta
          key='viewport'
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>Wordle</title>
        <link rel='icon' type='image/x-icon' href='src/public/favicon.ico' />
      </Head>
      <WordProvider>
        <Component {...pageProps} />
      </WordProvider>
    </>
  );
}
