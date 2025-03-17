import {
  base,
  mainnet as ethereum,
  sepolia,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
  tron,
  assetChain,
  assetChainTestnet,
  baseSepolia,
  Chain,
} from "viem/chains";
const testnet: [Chain, ...Chain[]] = [
  sepolia,
  baseSepolia,
  polygonMumbai,
  arbitrumGoerli,
  assetChainTestnet,
];
const mainnet: [Chain, ...Chain[]] = [
  ethereum,
  base,
  polygon,
  arbitrum,
  tron,
  assetChain,
];
export const supportedChains: [Chain, ...Chain[]] =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet" ? mainnet : testnet;
export const defaultChain =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet" ? base : baseSepolia;
