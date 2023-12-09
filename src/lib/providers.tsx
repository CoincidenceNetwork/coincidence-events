import { WagmiConfig, createConfig } from "wagmi";
import { env } from "@/env.mjs";
import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    alchemyId: env.NEXT_PUBLIC_ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_API_KEY,
    appName: "Coincidence Events",
  }),
);

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
