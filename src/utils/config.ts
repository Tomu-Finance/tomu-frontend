import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { supportedChains } from "./constants/chaints";
import { HttpTransport } from "viem";

const transports: Record<number, HttpTransport> = {};
for (const chain of supportedChains) {
  transports[chain.id] = http(); // Replace `http()` with the appropriate transport for your chosen chain
}
export const config = createConfig({
  chains: supportedChains, // Pass your required chains as an array
  transports,
});
