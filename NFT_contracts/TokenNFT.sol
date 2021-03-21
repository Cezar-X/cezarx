pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";



contract TokenNFT is ERC20, AccessControl{
    
    address private nftAddr;
    address[] private owners;
    uint256 private tokenId;
    bytes32 public constant CALLER = keccak256("CALLER");

    
    constructor(address _nftAddr, uint256 _tokenId, address[] memory _owners, string memory _name, string memory _symbol) public ERC20(_name,_symbol){
        nftAddr = _nftAddr;
        tokenId = _tokenId;
        owners = _owners;
        _setupRole(CALLER, msg.sender);
        _mint(msg.sender, 100);
    }
    
    function airDrop() public returns(bool){
        require(hasRole(CALLER, msg.sender), "Caller is not a recognized");
        for(uint8 i= 0; i< owners.length; i++){
            _transfer(address(this), owners[i], 1000000000000000000);
        }
        return true;

    }
    
    function kill() public {
        require(hasRole(CALLER, msg.sender), "Caller is not recognized");
        selfdestruct(msg.sender);

    }
    
    
    function getNFTAddr() public view returns(address){
        return nftAddr;
    }
    
    function getTokenId() public view returns(uint256){
        return tokenId;
    }
    
    function getOwners() public view returns(address[] memory){
        return owners;
    }
    
    
    
}