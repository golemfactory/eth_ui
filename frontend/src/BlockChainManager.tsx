import { useNetwork } from "wagmi";
export const BlockChainManager = () => {
  const { chain } = useNetwork();
  console.log("chain: ", chain);
  return <w3m-button />;
};
