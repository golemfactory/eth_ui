import { ReactNode } from "react";
import { WagmiConfig } from "wagmi";
import { polygon, polygonMumbai, mainnet, holesky, localhost, goerli, sepolia } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

const projectId = "20bd2ed396d80502980b6d2a3fb425f4";

const metadata = {
  name: "Golem",
  description: "Onboarding to Golem Network",
  url: "https://web3modal.com",
  icons: ["/logo.svg"],
};

const chains = [polygon, polygonMumbai, mainnet, holesky, localhost, goerli, sepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
});

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
