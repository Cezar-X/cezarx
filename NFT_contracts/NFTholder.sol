pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
     
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}


contract NFTholder is IERC721Receiver{
    
    address public manager;
    mapping(address => bool) allowed;
    
    constructor() public{
        manager = msg.sender;
        allowed[msg.sender] = true;
    }
    
    function setAllowedCaller(address _caller) public {
        require(msg.sender == manager);
        allowed[_caller] = true;
    }
    
    function transferNFT(address _nftAddr, address _user, uint256 _tokenId) public{
        require(allowed[msg.sender] == true);
        IERC721 nftSC = IERC721(_nftAddr);
        nftSC.safeTransferFrom(address(this), _user, _tokenId);
    }
    
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
    
   
}