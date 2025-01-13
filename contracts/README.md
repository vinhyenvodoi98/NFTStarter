# Cairo contracts (Starknet)

## Setting environment

https://docs.starknet.io/quick-start/environment-setup/

## Setting account

https://docs.starknet.io/quick-start/set-up-an-account/

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

# Soldity contracts

```bash
cd solidity
yarn
yarn hardhat compile
```
