import { FC, useState } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

import { GraphQLProvider } from "../../GraphQL";
import { Input } from "../../components/Input/Input";
import { Network } from "../../components/Network/Network";
import configFile from "../../config.json";
import { Infobar } from "../../components/Infobar/Infobar";

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

const SettingsPage: React.FC = () => {
  const [dappAddress, setDappAddress] = useState<string>("0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Network />

        <GraphQLProvider>
          <Infobar
            dappAddress={dappAddress}
            setDappAddress={setDappAddress}
          />
        </GraphQLProvider>
      </div>
    </div>
  );
};

export default SettingsPage;