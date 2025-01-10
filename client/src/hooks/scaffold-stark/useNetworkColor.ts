import { useTargetNetwork } from "./useTargetNetwork";
import { ChainWithAttributes } from "@/utils/networks";

export const DEFAULT_NETWORK_COLOR: [string, string] = ["#666666", "#bbbbbb"];

export function getNetworkColor(
  network: ChainWithAttributes,
) {
  return Array.isArray(DEFAULT_NETWORK_COLOR)
}

/**
 * Gets the color of the target network
 */
export const useNetworkColor = () => {
  const { targetNetwork } = useTargetNetwork();

  return getNetworkColor(targetNetwork);
};
