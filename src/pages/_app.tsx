import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { XMTPProvider } from "@xmtp/react-sdk";
import { type AppType } from "next/dist/shared/lib/utils";

import ClientOnly from "@/components/client-only";
import { WagmiProvider } from "@/lib/providers";
import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiProvider>
      <XMTPProvider>
        <ClientOnly>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
            <Toaster />
          </ThemeProvider>
        </ClientOnly>
      </XMTPProvider>
    </WagmiProvider>
  );
};

export default MyApp;
