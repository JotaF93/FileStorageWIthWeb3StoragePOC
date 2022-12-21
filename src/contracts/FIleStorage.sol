pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721Full.sol";

contract FileStorage is ERC721Full {
    string[] private files;
    mapping(string => bool) _fileAlreadyExists;

    constructor() public ERC721Full("FileStorage", "FILESTORAGE") {}

    function mint(string memory _file) public {
        require(!_fileAlreadyExists[_file]);
        uint256 _id = (files.push(_file)) -1;
        _mint(msg.sender, _id);
        _fileAlreadyExists[_file] = true;
    }

    function retrieve(uint256 _tokenId) public view returns (string memory) {
    string memory file = files[_tokenId];
    return (file);
    }

    function retrieveByAddress(address _owner) public view returns (string[] memory) {
      string[] memory tokens = new string[](balanceOf(_owner));
      uint i = 0;
      for (uint j = 0; j < files.length; j++) {
        address k = ownerOf(j);
        if (k == _owner) {
            tokens[i] = files[j];
            i++;
        }
    }
    return tokens;
    }

    function getFiles() public view returns (string[] memory) {
      return files;
    }
}