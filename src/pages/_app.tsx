import { type AppType } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";
import BottomNavigation from "@/components/bottom-navigation";
import ClientOnly from "@/components/client-only";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClientOnly>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
        <Toaster />
        <BottomNavigation></BottomNavigation>
      </ThemeProvider>
    </ClientOnly>
  );
};

export default MyApp;
