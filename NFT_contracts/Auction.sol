pragma solidity ^0.6.2;

import "TokenNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";



contract Auction{
    
    using SafeMath for uint256;
    
    address public nftAddr;
    uint256 public tokenId;
    uint256 public  nftDebt;
    TokenNFT public nftToken;
    IERC20 public debtToken;
    uint256 public maxBid;
    bool public ended;
    address public manager;
    
    mapping(address => uint256) bids;
    mapping(uint256 => address) bidToUser;

    modifier isEligible{
        require(nftToken.balanceOf(msg.sender) == 1000000000000000000);
        _;
    }
    
    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }
    
    constructor(address _nftAddr, uint256 _tokenId, uint256 _nftDebt, address _nftToken, address _debtToken) public{
        nftAddr = _nftAddr;
        tokenId = _tokenId;
        nftDebt = _nftDebt;
        nftToken = TokenNFT(_nftToken);
        debtToken = IERC20(_debtToken);
        maxBid = _nftDebt;
        ended = false;
        manager = msg.sender;
        
    }
    
    event bidReceived(address indexed Bidder, uint256 indexed CurrentMax);
    event winningBid(address indexed Winner, uint256 indexed WinningBid);
    
    function sendBid(uint256 _amount) public isEligible{
        uint256 currentBid = bids[msg.sender].add(_amount);
        require(currentBid > nftDebt && currentBid > maxBid &&  debtToken.allowance(msg.sender, address(this)) >= currentBid);
        require(debtToken.transferFrom(msg.sender, address(this), _amount) == true);
        maxBid = currentBid;
        bidToUser[maxBid] = msg.sender;
        bids[msg.sender] = currentBid;
        emit bidReceived(msg.sender, maxBid);
    } 
    
    function getBidBack() public isEligible{
        require(ended == true && bidToUser[maxBid] != msg.sender);
        require(debtToken.transferFrom(address(this), msg.sender, bids[msg.sender]) == true);
        
    } 
    
    function endAuction(address _masterWallet) public onlyManager returns(address, uint256){
        ended = true;
        require(debtToken.transfer(_masterWallet, maxBid) == true);
        emit winningBid(bidToUser[maxBid], maxBid);
        return(bidToUser[maxBid], maxBid);
    }
    
    
}