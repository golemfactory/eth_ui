/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./App.css";
import { useNetwork, useContractWrite } from "wagmi";

import Form from "@rjsf/mui";

import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { BlockchainProvider } from "./blockchainProvider";
import { BlockChainManager } from "./BlockChainManager";
import { useRef, useState } from "react";

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
      enum: ["mainnet", "polygon", "holesky", "localhost"],
    },
  },
  required: ["abi"],
};

const uploadABiUISchema = {
  abi: {
    "ui:widget": "file",
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
  network: string;
  address: string;
  schema: RJSFSchema;
  abi: unknown;
}) {
  console.log("abu", abi);
  const contract = useContractWrite({
    //@ts-ignore
    address: "0x866549a316c1290f1937B89be27a160f2F0db016",
    //@ts-ignore
    abi,
    functionName: schema.title,
    args: [1],
  });

  return (
    <>
      <Form
        schema={schema}
        validator={validator}
        onSubmit={() => {
          console.log(network, address);
          contract.writeAsync();
        }}
      />
    </>
  );
};

function App() {
  const [functions, setFunctions] = useState([]);
  const abiRef = useRef();
  return (
    <BlockchainProvider>
      <div className="grid grid-cols-12 ml-12 mr-12 gap-6 w-screen p-10">
        <div className="col-start-5 col-span-3 border p-6 rounded-lg bg-lightblue-50">
          <BlockChainManager />
          <div className="mt-6"></div>
          <Form
            schema={uploadABISchema}
            uiSchema={uploadABiUISchema}
            validator={validator}
            onSubmit={(data) => {
              console.log("da", data);
              fetch(data.formData.abi)
                .then((res) => res.json())
                .then((abi) => {
                  abiRef.current = abi;
                  const allFunctions = abi.filter(
                    (x: { type: string }) => x.type === "function"
                  );

                  const contractFunctions = allFunctions.map(
                    (fn: { inputs: ABIInput[]; name: string }) => {
                      return {
                        title: fn.name,
                        type: "object",
                        properties: fn.inputs.map(toProperty),
                      };
                    }
                  );
                  console.log(contractFunctions);
                  setFunctions(contractFunctions);
                });
            }}
          />
        </div>
        {functions.map((fn) => {
          return (
            <div className="col-span-6 p-4 border rounded-lg">
              <MethodForm
                abi={abiRef.current}
                schema={fn}
                network="dupa"
                address="fdfd"
              />{" "}
            </div>
          );
        })}
      </div>
    </BlockchainProvider>
  );
}

export default App;
