import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { getTargetNetworks } from "@/utils/networks";
import { useAccount, useSwitchChain } from "@starknet-react/core";
import { useEffect, useMemo } from "react";

type NetworkOptionsProps = {
  hidden?: boolean;
};

export const NetworkOptions = ({ hidden = false }: NetworkOptionsProps) => {
  const { switchChain, error: switchChainError } = useSwitchChain({});
  const { chainId } = useAccount();
  const allowedNetworks = getTargetNetworks();

  useEffect(() => {
    if (switchChainError)
      console.error(`Error switching chains: ${switchChainError}`);
  }, [switchChainError]);

  // note: might need a cleaner solutiojn
  const allowedNetworksMapping = useMemo(() => {
    return Object.fromEntries(
      allowedNetworks.map((chain:any) => [chain.network, chain.id.toString(16)]),
    );
  }, [allowedNetworks]);

  return (
    <>
      {allowedNetworks
        .filter((allowedNetwork:any) => allowedNetwork.id !== chainId)
        .map((allowedNetwork:any) => (
          <li key={allowedNetwork.network} className={hidden ? "hidden" : ""}>
            <button
              className="menu-item btn-sm !rounded-xl flex gap-3 py-3 whitespace-nowrap"
              type="button"
              onClick={() =>
                switchChain({
                  chainId: allowedNetworksMapping[allowedNetwork.network],
                })
              }
            >
              <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span>
                Switch to{" "}
                <span
                  style={{
                    color: "#666666",
                  }}
                >
                  {allowedNetwork.name}
                </span>
              </span>
            </button>
          </li>
        ))}
    </>
  );
};
