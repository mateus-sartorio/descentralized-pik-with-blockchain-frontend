import { FC } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "../GraphQL";
import { Input } from "../components/Input/Input";
import { Network } from "../Network";
import configFile from "../config.json";
import { Infobar } from "../components/Infobar/Infobar";

const config: any = configFile;

const injected: any = injectedModule();
init({
  wallets: [injected],
  chains: Object.entries(config).map(([k, v]: [string, any], i) => ({ id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl })),
  appMetadata: {
    name: "Cartesi Rollups Test DApp",
    icon: "<svg><svg/>",
    description: "Demo app for Cartesi Rollups",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

const CreateCertificatePage: React.FC = () => {
  const [ dappAddress, setDappAddress ] = useState<string>("0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e");

  return (
    <div>
      <br />

      <Network />

      <br />

      <GraphQLProvider>
        <Infobar
          dappAddress={dappAddress}
          setDappAddress={setDappAddress}
        />

        <br />
        
        <Input dappAddress={dappAddress} />

        <br />
      </GraphQLProvider>
    </div>
  );
};

export default CreateCertificatePage;