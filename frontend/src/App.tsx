/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./App.css";
import { useNetwork, useContractWrite } from "wagmi";

import Form from "@rjsf/mui";

import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { BlockchainProvider } from "./blockchainProvider";
import { BlockChainManager } from "./BlockChainManager";
import { useRef, useState } from "react";
import { polygon, polygonMumbai, mainnet, holesky, localhost, goerli, sepolia } from "wagmi/chains";

//TODO figure out how to specify enumNames for form generator
const nameToChain = (name: string) => {
  switch (name) {
    case "Mainnet":
      return mainnet;
    case "Polygon":
      return polygon;
    case "Mumbai":
      return polygonMumbai;
    case "Holesky":
      return holesky;
    case "Goerli":
      return goerli;
    case "Sepolia":
      return sepolia;
    case "Localhost":
      return localhost;
  }
};
const uploadABISchema: RJSFSchema = {
  title: "Play with contract ABI",
  type: "object",
  properties: {
    address: {
      type: "string",
      title: "Address",
      description: "The address of the contract",
    },
    abi: {
      type: "string",
      title: "ABI",
      description: "The ABI of the contract",
    },
    network: {
      enum: ["Mainnet", "Polygon", "Mumbai", "Holesky", "Goerli", "Sepolia", "Localhost"],
    },
  },
  required: ["abi"],
};

const uploadABiUISchema = {
  abi: {
    "ui:widget": "file",
  },
  network: {
    "ui:widget": "select",
    "ui:options": {},
  },
};

type ABIInput = {
  internalType: string;
  name: string;
  type: string;
};

const toProperty = (a: ABIInput) => {
  const isArr = a.type.includes("[]");
  const isUint = a.type.includes("uint");
  const isBytes = a.type.includes("bytes");

  const exactType = isArr ? a.type.slice(0, -2) : a.type;

  const type = isUint ? "uint" : isBytes ? "bytes" : exactType;

  const abiTypeToJSONType = {
    address: "string",
    uint: "number",
    bytes: "string",
    bool: "boolean",
  };

  return {
    title: a.name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    type: abiTypeToJSONType[type],
  };
};

const MethodForm = function ({
  network,
  address,
  schema,
  abi,
}: {
  network: number;
  address: string;
  schema: RJSFSchema;
  abi: unknown;
}) {
  const contract = useContractWrite({
    //@ts-ignore
    address: address,
    //@ts-ignore
    abi,
    functionName: schema.title,
    chainId: network,
  });

  return (
    <>
      <Form
        schema={schema}
        validator={validator}
        className="text-black bg-lightblue-50 p-10 rounded-lg border-2 border-lightblue-100"
        onSubmit={(data) => {
          console.log(data.formData);
          contract.writeAsync({
            //@ts-ignore
            args: Object.values(data.formData),
          });
        }}
      />
    </>
  );
};

function App() {
  const [functions, setFunctions] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(1);
  const [address, setAddress] = useState("");

  const abiRef = useRef();
  return (
    <BlockchainProvider>
      <div className="grid grid-cols-12 ml-12 mr-12 gap-6 w-screen p-10">
        <div className="col-start-5 col-span-3 border p-6 rounded-lg bg-lightblue-50">
          <BlockChainManager />
          <div className="mt-6"></div>
          <Form
            className="text-black"
            schema={uploadABISchema}
            uiSchema={uploadABiUISchema}
            validator={validator}
            onSubmit={(data) => {
              //@ts-ignore
              setSelectedNetwork(nameToChain(data.formData.network).id);
              setAddress(data.formData.address);
              fetch(data.formData.abi)
                .then((res) => res.json())
                .then((abi) => {
                  abiRef.current = abi;
                  const allFunctions = abi.filter((x: { type: string }) => x.type === "function");

                  const contractFunctions = allFunctions.map((fn: { inputs: ABIInput[]; name: string }) => {
                    return {
                      title: fn.name,
                      type: "object",
                      properties: fn.inputs.map(toProperty),
                    };
                  });
                  setFunctions(contractFunctions);
                });
            }}
          />
        </div>
        {functions.map((fn) => {
          return (
            <div className="col-span-6 p-4 border rounded-lg">
              <MethodForm abi={abiRef.current} schema={fn} network={selectedNetwork} address={address} />{" "}
            </div>
          );
        })}
      </div>
    </BlockchainProvider>
  );
}

export default App;
