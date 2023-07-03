import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Mock API
import buildServer from '@/server/mirage';

buildServer();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
