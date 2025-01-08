import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  voyager
} from "@starknet-react/core";

export default function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [sepolia];
  const provider = publicProvider();
  const connectors = [braavos(), argent()];

  return(
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  )
}
