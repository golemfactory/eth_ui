import { useNetwork } from "wagmi";
export const BlockChainManager = () => {
  const { chain } = useNetwork();
  return <w3m-button />;
};
