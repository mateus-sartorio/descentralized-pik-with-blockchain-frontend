import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "../../components/GraphQL/GraphQL";
import { Input } from "../../components/Input/Input";
import configFile from "../../config.json";

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
  const [ dappAddress ] = useState<string>("0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e");

  return (
    <div>
      <GraphQLProvider>
        <Input dappAddress={dappAddress} />
      </GraphQLProvider>
    </div>
  );
};

export default CreateCertificatePage;