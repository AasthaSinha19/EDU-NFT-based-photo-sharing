// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NFTPhotoSharing {
    struct PhotoNFT {
        uint256 id;
        string tokenURI;
        address creator;
        address owner;
    }

    mapping(uint256 => PhotoNFT) public photos;
    mapping(uint256 => address) public approvals;
    uint256 private _tokenIdCounter;
    
    event PhotoMinted(uint256 indexed tokenId, address indexed creator, string tokenURI);
    event PhotoTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    function mintPhoto(string memory _tokenURI) public {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        photos[newTokenId] = PhotoNFT({
            id: newTokenId,
            tokenURI: _tokenURI,
            creator: msg.sender,
            owner: msg.sender
        });

        emit PhotoMinted(newTokenId, msg.sender, _tokenURI);
    }

    function transferPhoto(address _to, uint256 _tokenId) public {
        require(photos[_tokenId].owner == msg.sender, "Only owner can transfer");

        photos[_tokenId].owner = _to;
        emit PhotoTransferred(_tokenId, msg.sender, _to);
    }

    function getCreator(uint256 _tokenId) public view returns (address) {
        require(photos[_tokenId].id != 0, "Token does not exist");
        return photos[_tokenId].creator;
    }

    function getPhotoDetails(uint256 _tokenId) public view returns (string memory, address, address) {
        require(photos[_tokenId].id != 0, "Token does not exist");
        PhotoNFT memory photo = photos[_tokenId];
        return (photo.tokenURI, photo.creator, photo.owner);
    }
}

