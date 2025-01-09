use starknet::ContractAddress;

#[starknet::interface]
pub trait INFTStarter<TContractState> {
    fn get_token_uri(self: @TContractState, token_id: u256) -> ByteArray;
    fn get_owner(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
pub mod NFTStarter {
    use OwnableComponent::InternalTrait;
use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    // use openzeppelin::account::utils::signature::is_valid_stark_signature;
    use openzeppelin_token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use starknet::{get_caller_address, ContractAddress};
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};

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
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }

    #[constructor]
    fn constructor(
        ref self: ContractState
    ) {
        self.erc721.initializer("NFTStarter", "NFTS", "");
        let owner = get_caller_address();
        self.ownable.initializer(owner);
    }

    #[generate_trait]
    #[abi(per_item)]
    impl ExternalImpl of ExternalTrait {
        #[external(v0)]
        fn safe_mint(
            ref self: ContractState,
            recipient: ContractAddress,
            uri: ByteArray,
            token_id: u256,
            data: Span<felt252>,
        ) {
            self.ownable.assert_only_owner();
            self.nft_uri.write(token_id, uri);
            self.erc721.safe_mint(recipient, token_id, data);
        }

        #[external(v0)]
        fn safeMint(
            ref self: ContractState,
            recipient: ContractAddress,
            uri: ByteArray,
            token_id: u256,
            data: Span<felt252>,
        ) {
            self.safe_mint(recipient, uri, token_id, data);
        }
    }

    #[abi(embed_v0)]
    impl INFTStarterImpl of super::INFTStarter<ContractState> {
        fn get_token_uri(self: @ContractState, token_id: u256) -> ByteArray {
            self.nft_uri.read(token_id)
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.ownable.owner()
        }
    }
}
