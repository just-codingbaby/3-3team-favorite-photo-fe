import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "@/components/layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return (
    <QueryClientProvider client={queryClient}>
      
      {getLayout(<Component {...pageProps} />)}
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
