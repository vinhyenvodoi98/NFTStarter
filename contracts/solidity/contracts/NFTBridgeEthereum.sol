// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ContractMsg.sol";

contract NFTBridgeEthereum is IERC721Receiver, Ownable {
    ContractMsg public messagingContract;

    event NFTLocked(
        address indexed user,
        address indexed nftAddress,
        uint256 tokenId,
        uint256 starknetRecipient
    );

    constructor(address _messagingContract) Ownable(msg.sender) {
        messagingContract = ContractMsg(_messagingContract);
    }

    function lockNFT(
        address nftAddress,
        uint256 tokenId,
        uint256 starknetRecipient
    ) external {
        IERC721 nftContract = IERC721(nftAddress);
        // Transfer NFT to this contract (locks it)
        nftContract.transferFrom(msg.sender, address(this), tokenId);

        // Compose a message to send to Starknet
        uint256[] memory payload = new uint256[](2);
        payload[0] = uint256(uint160(starknetRecipient));
        payload[1] = tokenId;

        // Send message to Starknet
        messagingContract.consumeMessageStruct(
            uint256(uint160(msg.sender)),
            payload
        );

        // Emit event
        emit NFTLocked(msg.sender, nftAddress, tokenId, starknetRecipient);
    }

    function setStarknetMessaging(address _starknetMessaging) external onlyOwner {
        messagingContract = ContractMsg(_starknetMessaging);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
