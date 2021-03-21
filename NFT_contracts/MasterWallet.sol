pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "NFTholder.sol";
import "czWETH.sol";
import "Auctionable.sol";



contract MasterWallet{
    
    using SafeMath for uint256;
    
    mapping(address => uint256) public hasLoan;
    mapping(uint256 => Loan) loans;
    mapping(uint256 => address) public providers;
    
    
    uint8 public interest;
    uint256 private index;
    uint256 private providerId;
    address public manager;
    NFTholder private holder;
    Auctionable private auctionable;
    
    struct Loan{
        uint256 id;
        uint256 debt;
        uint256 tokenId;
        uint256 period;
        uint256 start;
        address payable borrower;
        address nftAddr;
    }
    
    
    modifier onlyManager{
        require(msg.sender == manager);
        _;
    }
    
    modifier loanFree{
        require(hasLoan[msg.sender] == 0);
        _;
    }
    
    event NewLoan
    (uint256 loanId, address indexed NFTAddr, uint256 indexed TokenId, 
    uint256 TotalDebt, uint256 StartDate, uint256 Period, address indexed Borrower);
    
    event newDeposit(address indexed Token, address indexed Provider, uint256 Amount);

    
    constructor(uint8 _interest, address _holder, address _auctionable) public {
        index = 1;
        providerId = 1;
        manager = msg.sender;
        interest = _interest;
        holder = NFTholder(_holder);
        auctionable = Auctionable(_auctionable);
        
    }
    
    function changeInterest(uint8 _newInterest) public onlyManager{
        interest = _newInterest;
    }
    
    function changeManager(address _newManager) public onlyManager{
        manager = _newManager;
    }
    
    
    function changeHolder(address _newHolder) public onlyManager{
        holder = NFTholder(_newHolder);
    }
    
    function changeAuctionable(address _newAuctionable) public onlyManager{
        auctionable = Auctionable(_newAuctionable);
    }
    
    function newLoan(address _nftAddr, uint256 _tokenId, uint256 _debt, uint256 _period, address _liqToken) external loanFree{
        require(_debt > 0.01 ether && _period > 0 && _nftAddr != address(0));
        require(getBalanceOfSC(_liqToken) > _debt.mul(5));
        IERC721 nft = IERC721(_nftAddr);
        require(nft.ownerOf(_tokenId) == address(holder));
        uint256 _totalDebt = (_debt.mul(interest)).div(100);
        uint256 _start = now;
        Loan memory loan = Loan(index, _totalDebt, _tokenId, _period, _start, msg.sender, _nftAddr);
        require(transferTokenToBorrower(msg.sender, _debt, _liqToken) == true, "Controller: Token transfer failled");
        loans[index] = loan;
        hasLoan[msg.sender] = index;
        emit NewLoan(index, _nftAddr, _tokenId, _totalDebt, _start, _period, msg.sender);
        index.add(1);
    }
    
    function loanPaid() external {
        require(hasLoan[msg.sender] != 0);
        address addr = loans[hasLoan[msg.sender]].nftAddr;
        uint256 id = loans[hasLoan[msg.sender]].tokenId;
        holder.transferNFT(addr, msg.sender, id); 
        hasLoan[msg.sender] = 0;
    }
    
    function transferTokenToBorrower(address _recipient, uint256 _amount, address _liqToken) internal returns(bool){
        IERC20 ERC20 = IERC20(_liqToken);
        return ERC20.transfer(_recipient,_amount);
    } 
    
    function getLoanData(address _borrower) 
    public view returns(uint256 Id, uint256 Debt, uint256 TokenId, uint256 Period, uint256 Start, address NFTAddr) {
        Id = hasLoan[_borrower];
        Debt = loans[Id].debt;
        TokenId = loans[Id].tokenId;
        Period = loans[Id].period;
        Start = loans[Id].start;
        NFTAddr = loans[Id].nftAddr;
    }
    
    function loanDefault(address _borrower) public{
        uint256 id = hasLoan[_borrower];
        require(id != 0);
        uint256 _start = loans[id].start;
        uint256 _period = loans[id].period;
        if (_start.add(_period) < now){
            auctionable.markAsAuctionable(loans[id].nftAddr, loans[id].tokenId, loans[id].debt);
            hasLoan[_borrower] = 0;
        }
    }
    
    
    
    function depositTokens(address _token, uint256 _amount, address _cztoken) public {
        IERC20 ERC20 = IERC20(_token);
        require(ERC20.allowance(msg.sender, address(this)) >= _amount, "Funds not released");
        require(ERC20.transferFrom(msg.sender, address(this), _amount) == true, "Failed contribution");
        czWETH cztoken = czWETH(_cztoken);
        cztoken.mint(msg.sender, _amount);
        if(_amount >= 5 ether){
            providers[providerId] = msg.sender;
            providerId.add(1);
        }
        emit newDeposit(_token, msg.sender, _amount);

    }
    
    function withdrawFunds(address _token, uint256 _amount, address _cztoken) public{
        IERC20 ERC20 = IERC20(_token);
        czWETH cztoken = czWETH(_cztoken);
        uint256 czBalance = cztoken.balanceOf(msg.sender);
        require(czBalance >= _amount);
        require(ERC20.transfer(msg.sender, _amount) == true);
        cztoken.burn(msg.sender, _amount);        

    }
    
    function getBalanceOfSC(address _token) public view returns(uint256){
        IERC20 ERC20 = IERC20(_token);
        return ERC20.balanceOf(address(this));
    }
}