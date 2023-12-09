import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string(),
    NEXT_PUBLIC_WALLETCONNECT_API_KEY: z.string(),
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    OPENAI_TOKEN: process.env.OPENAI_TOKEN,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_WALLETCONNECT_API_KEY:
      process.env.NEXT_PUBLIC_WALLETCONNECT_API_KEY,
  },
});
