import { AppProps } from 'next/app';

import { ToastContainer } from "react-toastify";

import '@/styles/globals.css';
import '@/styles/colors.css';
import "react-toastify/ReactToastify.min.css";

import Header from '@/components/layout/Header';

import { useIsSsr } from '../utils/ssr';
import StarknetProvider from '@/components/Providers';

function MyApp({ Component, pageProps }: AppProps) {
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (
    <StarknetProvider>
      <Header />
        <Component {...pageProps} />
      <ToastContainer position="bottom-right" newestOnTop />
    </StarknetProvider>
  );
}

export default MyApp;
