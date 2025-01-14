# Cairo contracts (Starknet)

## Setting environment

https://docs.starknet.io/quick-start/environment-setup/

## Setting account

https://docs.starknet.io/quick-start/set-up-an-account/

Faucet: https://starknet-faucet.vercel.app/

## Build smart contract

```bash
cd cairo
scarb build
```

## Test smart contract

```bash
cd cairo
scarb test
```

## Declare contract

```bash
cd cairo
starkli declare target/dev/nftstarter_NFTStarter.contract_class.json --network=sepolia --account ./account.json --keystore ./keystore.json
```

## Deploy contract

```bash
starkli deploy <CLASS_HASH> <CONSTRUCTOR_INPUTS> --network <NETWORK> --account ./account.json --keystore ./keystore.json

# starkli deploy 0x06802c4c67a5c66b3922f162496997ae14bb3e1bc3aee0633fa562d7b560e08b str:GALOIS 6 str:GAL 3 0x4b7abb48d891de884d5e4fb7579b88833ef99d621f4a5aaa036830e70e7dcfb --network sepolia --account ./account.json --keystore ./keystore.json
```

# Soldity contracts

```bash
cd solidity
yarn
yarn hardhat compile
```

## Deploy NFT contract

```bash
yarn hardhat ignition deploy ignition/modules/NFTStarter.ts --network <NETWORK>
```

## Deploy NFTBridgeEthereum

```bash
yarn hardhat ignition deploy ignition/modules/NFTBridgeEthereum.ts --network <NETWORK>
```