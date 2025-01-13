use starknet::ContractAddress;

#[derive(Drop, Serde)]
struct MyData {
    sender: felt252,
    nft_address: felt252,
    token_id: felt252
}

#[starknet::interface]
pub trait INFTStarter<TContractState> {
    fn get_token_uri(self: @TContractState, token_id: u256) -> ByteArray;
    fn get_owner(self: @TContractState) -> ContractAddress;
    fn get_public_key_signer(self: @TContractState) -> felt252;
    fn lazy_mint(ref self: TContractState, to: ContractAddress, uri: ByteArray, token_id: u256, msg_hash: felt252, signature: Span<felt252>);
}

#[starknet::contract]
pub mod NFTStarter {
    use OwnableComponent::InternalTrait;
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::account::utils::signature::is_valid_stark_signature;
    use openzeppelin_token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use starknet::{get_caller_address, ContractAddress};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerWriteAccess, StoragePointerReadAccess, StoragePathEntry};
    use core::num::traits::Zero;
    use super::MyData;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        pub nft_uri: Map<u256, ByteArray>,
        pub public_key_signer: felt252,
        pub sig_is_used: Map<felt252, Map<felt252, bool>>
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        ValueReceivedFromL1: ValueReceived,
        StructReceivedFromL1: StructReceived
    }

    #[derive(Drop, starknet::Event)]
    struct ValueReceived {
        #[key]
        l1_address: felt252,
        value: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct StructReceived {
        #[key]
        l1_address: felt252,
        data_sender: felt252,
        data_nft_address: felt252,
        data_token_id: felt252
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        name_length: usize,
        symbol: felt252,
        symbol_length: usize,
        public_key: felt252,
    ) {
        let mut name_collection = "";
        name_collection.append_word(name, name_length);

        let mut symbol_collection = "";
        symbol_collection.append_word(symbol, symbol_length);

        self.erc721.initializer(name_collection, symbol_collection, "");
        self.public_key_signer.write(public_key);
        let owner = get_caller_address();
        self.ownable.initializer(owner);
    }

    pub mod Errors {
        pub const INVALID_SIGNATURE: felt252 = 'invalid signature';
        pub const REPLAY_SIGNATURE: felt252 = 'replay signature';
    }

    #[abi(embed_v0)]
    impl INFTStarterImpl of super::INFTStarter<ContractState> {
        fn get_token_uri(self: @ContractState, token_id: u256) -> ByteArray {
            self.nft_uri.read(token_id)
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.ownable.owner()
        }

        fn get_public_key_signer(self: @ContractState) -> felt252 {
            self.public_key_signer.read()
        }

        fn lazy_mint(ref self: ContractState, to: ContractAddress, uri: ByteArray, token_id: u256, msg_hash: felt252, signature: Span<felt252>) {
            let public_key = self.get_public_key_signer();

            assert(
                !self.sig_is_used.entry(*signature.at(0)).entry(*signature.at(1)).read(),
                Errors::REPLAY_SIGNATURE
            );

            assert(
                is_valid_stark_signature(msg_hash, public_key, signature),
                Errors::INVALID_SIGNATURE
            );

            self.sig_is_used.entry(*signature.at(0)).entry(*signature.at(1)).write(true);
            self.erc721.mint(to, token_id);
            self.nft_uri.write(token_id, uri);
        }
    }

    #[l1_handler]
    fn msg_handler_value(ref self: ContractState, from_address: felt252, value: felt252) {
        // assert(from_address == ...);

        // assert(value == 123, 'Invalid value');

        self.emit(ValueReceived { l1_address: from_address, value, });
    }

    #[l1_handler]
    fn msg_handler_struct(ref self: ContractState, from_address: felt252, data: MyData) {
        // assert(from_address == ...);

        assert(!data.sender.is_zero(), 'data.sender is invalid');
        assert(!data.nft_address.is_zero(), 'data.nft_address is invalid');
        assert(!data.token_id.is_zero(), 'data.token_id is invalid');

        self.emit(StructReceived { l1_address: from_address, data_sender: data.sender, data_nft_address: data.nft_address, data_token_id: data.token_id });
    }
}
