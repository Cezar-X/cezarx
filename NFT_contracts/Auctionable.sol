pragma solidity ^0.6.2;

import "TokenNFT.sol";
import "Auction.sol";
import "NFTholder.sol";

contract Auctionable{
    
    address public manager;
    address public masterWallet;
    mapping(address => mapping(uint256 => bool)) isAuctionable;
    mapping(address => mapping(uint256 => bool)) isTokanized;
    mapping(address =>mapping(uint256 => address)) nftToToken;
    mapping(address =>mapping(uint256 => bool)) inAuction;
    mapping(address =>mapping(uint256 => uint256)) nftDebt;
    mapping(address =>mapping(uint256 => address)) nftToAuction;
    
    modifier onlyMaster{
        require(msg.sender == masterWallet);
        _;
    }
    
     modifier onlyManager{
        require(msg.sender == manager);
        _;
    }
    
    constructor() public {
        manager = msg.sender;
        
    }
    
    event IsAuctionable(address indexed NFTAddr, uint256 indexed );
    
    function setMasterWallet(address _masterWallet) public onlyManager{
        masterWallet = _masterWallet;

    }
    
    function markAsAuctionable(address _nftAddr, uint256 _tokenId, uint256 _debt) public onlyMaster{
        isAuctionable[_nftAddr][_tokenId] = true;
        isTokanized[_nftAddr][_tokenId] = false;
        nftDebt[_nftAddr][_tokenId] = _debt;
        emit IsAuctionable(_nftAddr,_tokenId);
        
    }
    
    function tokenizeNFT(address _nftAddr, uint256 _tokenId, address[] memory _owners, string memory _name, string memory _symbol) 
    public onlyManager{
        require(isAuctionable[_nftAddr][_tokenId] == true && isTokanized[_nftAddr][_tokenId] == false);
        TokenNFT nftToken = new TokenNFT(_nftAddr, _tokenId, _owners, _name, _symbol);
        require(nftToken.airDrop() == true);
        nftToToken[_nftAddr][_tokenId] = address(nftToken);
    }
    
    function startAuction(address _nftAddr, uint256 _tokenId, address _debtToken) public onlyManager{
        require(isAuctionable[_nftAddr][_tokenId] == true && isTokanized[_nftAddr][_tokenId] == true);
        Auction auctionSC = new Auction(_nftAddr, _tokenId, 
        nftDebt[_nftAddr][_tokenId], nftToToken[_nftAddr][_tokenId], _debtToken);
        inAuction[_nftAddr][_tokenId] = true;
        nftToAuction[_nftAddr][_tokenId] = address(auctionSC);
        
    }
    
    function closeAuction(address _nftAddr, uint256 _tokenId, address _holder) public onlyManager{
        Auction auctionSC = Auction(nftToAuction[_nftAddr][_tokenId]);
        address winner;
        uint256 winningBid;
        (winner, winningBid) = auctionSC.endAuction(masterWallet);
        NFTholder holder = NFTholder(_holder);
        holder.transferNFT(_nftAddr, winner, _tokenId);
        TokenNFT tokenNFT = TokenNFT(nftToToken[_nftAddr][_tokenId]);
        tokenNFT.kill();
        cleanStorage(_nftAddr,_tokenId);
    }
    
    function cleanStorage(address _nftAddr, uint256 _tokenId) internal{
        isAuctionable[_nftAddr][_tokenId] = false;
        isTokanized[_nftAddr][_tokenId]  = false;
        nftToToken[_nftAddr][_tokenId]  = address(0);
        inAuction[_nftAddr][_tokenId]  = false;
        nftDebt[_nftAddr][_tokenId]  = 0;
        nftToAuction[_nftAddr][_tokenId]  = address(0);
    }
}