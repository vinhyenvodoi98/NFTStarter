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
        uint256 selector,
        uint256 l2ContractAddress,
        uint256 starknetRecipient
    ) external payable {
        IERC721 nftContract = IERC721(nftAddress);
        nftContract.transferFrom(msg.sender, address(this), tokenId);

        // Compose a message to send to Starknet
        uint256[] memory payload = new uint256[](2);
        payload[0] = uint256(uint160(starknetRecipient));
        payload[1] = tokenId;

        // Send message to Starknet
        messagingContract.sendMessage{value: 30000}(
            l2ContractAddress,
            selector,
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
