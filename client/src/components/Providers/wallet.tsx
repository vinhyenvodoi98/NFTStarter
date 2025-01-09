import { connect, disconnect } from "@starknet-io/get-starknet"

const Wallet = () => {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <button onClick={() => connect()}>Connect wallet</button>

      {/* <button onClick={() => disconnectWallet()}>
        Disconnect
      </button> */}
    </div>
  );
};

export default Wallet;
