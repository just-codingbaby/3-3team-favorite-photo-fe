import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/layout";
import AuthProvider from "@/contexts/AuthProvider";
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // staleTime: 60 * 1000,
          },
        },
      }),
  );
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}