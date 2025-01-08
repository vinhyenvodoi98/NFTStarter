import { disconnect, useStarknetkitConnectModal } from "starknetkit";
import { useConnect } from "@starknet-react/core"
import { InjectedConnector } from "starknetkit/dist/injectedConnector";
import { ArgentMobileConnector } from "starknetkit/dist/argentMobile";
const Wallet = () => {
  const { connect, connectors } = useConnect()

  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any
  })

  const connectWallet = async() => {
    const { connector } = await starknetkitConnectModal()
    await connect({ connector })
  }

  // const disconnectWallet = async() => {
  //   await disconnect({ clearLastWallet: true });
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <button onClick={() => connectWallet()}>
        Connect
      </button>

      {/* <button onClick={() => disconnectWallet()}>
        Disconnect
      </button> */}
    </div>
  );
};

export default Wallet;
