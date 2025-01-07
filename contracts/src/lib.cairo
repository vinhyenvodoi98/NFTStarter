// #[starknet::interface]
// pub trait INFT<TContractState> {
//     /// Increase contract balance.
//     fn increase_balance(ref self: TContractState, amount: felt252);
//     /// Retrieve contract balance.
//     fn get_balance(self: @TContractState) -> felt252;
// }

#[starknet::contract]
mod NFTStarter {
    use core::starknet::storage::{Map, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        name: felt252,
        symbol: felt252,
        balance: Map::<felt252, u256>,
        owner_of: Map::<felt252, u256>, // token_id -> owner
        balance_of: Map::<felt252, u256>, // owner -> balance
        token_approvals: Map::<felt252, u256>, // token_id -> approved address
        operator_approvals: Map<felt252, Map<felt252, felt252>> // owner -> operator -> approved
    }

    #[constructor]
    fn constructor(ref self: ContractState, name_: felt252, symbol_: felt252) {
        self.name.write(name_);
        self.symbol.write(symbol_);
    }
}
