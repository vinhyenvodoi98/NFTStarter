use nftstarter::INFTStarterDispatcherTrait;
use openzeppelin_token::erc721::interface::{IERC721MetadataDispatcher, IERC721MetadataDispatcherTrait};
use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address_global, stop_cheat_caller_address_global, test_address};
use nftstarter::INFTStarterDispatcher;

fn deploy_contract() -> ContractAddress {
    let contract = declare("NFTStarter").unwrap().contract_class();
    let contract_address = contract.precalculate_address(@array![]);
    start_cheat_caller_address_global(test_address());
    contract.deploy(@array![]).unwrap();
    stop_cheat_caller_address_global();
    contract_address
}


#[test]
fn test_metadata() {
    let contract_address = deploy_contract();

    let dispatcher = IERC721MetadataDispatcher { contract_address };
    let name = dispatcher.name();
    let symbol = dispatcher.symbol();

    let dispatcher = INFTStarterDispatcher { contract_address };
    let owner = dispatcher.get_owner();

    assert_eq!(name, "NFTStarter");
    assert_eq!(symbol, "NFTS");
    assert_eq!(owner, test_address());
}

