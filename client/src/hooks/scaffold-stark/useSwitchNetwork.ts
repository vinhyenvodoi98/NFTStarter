export const useSwitchNetwork = () => {
  return {
    switchNetwork: async (network: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (window.starknet && window.starknet.isConnected) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await window.starknet.request({
          type: "wallet_switchStarknetChain",
          params: {
            chainId: `SN_${
              network == "mainnet" ? "MAIN" : network.toUpperCase()
            }`,
          },
        });
      }
    },
  };
};
