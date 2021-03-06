import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/backend/router";
import { CollectionsContextProvider } from "@/contexts/CollectionsContext";
import { WebhooksContextProvider } from "@/contexts/WebhooksContext";
import { UserContextProvider } from "@/contexts/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <ModalsProvider>
        <UserContextProvider>
          <CollectionsContextProvider>
            <WebhooksContextProvider>
              <Component {...pageProps} />
            </WebhooksContextProvider>
          </CollectionsContextProvider>
        </UserContextProvider>

      </ModalsProvider>
    </MantineProvider>
  );
}

export default withTRPC<AppRouter>({
  config(/*{ ctx }*/) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = "/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
