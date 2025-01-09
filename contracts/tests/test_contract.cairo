use openzeppelin_token::erc721::interface::{IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait};
use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use nftstarter::{INFTStarterDispatcher, INFTStarterDispatcherTrait};

fn deploy_contract() -> ContractAddress {
    let contract = declare("NFTStarter").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();
    contract_address
}


#[test]
fn test_metadata() {
    let contract_address = deploy_contract();

    let dispatcher = IERC721MetadataDispatcher { contract_address };
    let name = dispatcher.name();
    let symbol = dispatcher.symbol();

    assert_eq!(name, "NFTStarter");
    assert_eq!(symbol, "NFTS");
}

