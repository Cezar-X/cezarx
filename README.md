# CezarX - Collateral Lending Protocol
An Open Source Project Made by @fionnachan and @dyd999x
## This is an open source project. If you see anyone claiming to have the ownership to sell its idea, concept, or code to you, you should realise that there is nothing for you to purchase.

CezarX is a collateral lending protocol that enables collectors to take out a fixed-rate loan using their NFT as collateral. The loan is funded by liquidity providers who earn interest paid by the borrower. In the event of a default on the loan ownership of the NFT is fractionalized and transferred to the liquidity providers. An exclusive auction is held where only the liquidity providers are eligible to bid.

The project is unmaintained post-hackathon. The hackathon ended at 12pm 21 March 2021 (Eastern Time).

### How It's Made
The webapp is designed on the fly while being built on the frontend so we skipped using any kind of design tools. The app is built in React using the Web3-React template. (https://github.com/NoahZinsmeister/web3-react) Next.js is used for server-side rendering. Styles and most frontend components are being built from scratch. We also used external libraries for several frontend components like the dialog from evergreen-ui for wallet connection selection, react-countdown for the countdown on the auction page, and evergreen-ui again for the table on the auction page.

For the smart contract, we wrote 7 Smart Contracts to enable our dApp to provide the required functionality:

- for liquidity providers: to send their WETH to our MasterWallet and earn interest, have the chance to participate in the exclusive actions we hold for the NFTs whose owners defaulted on their loan, withdraw their stake

- for NFT owners: to get a loan depending on their NFT value and the available liquidity, pay the debt+interest and received their NFT back

#### MasterWallet

This is the main smart contract of our dApp. It holds the funds sent by liquidity providers and the loans.

Methods:

newLoan -> when someone wants to get a loan from our platform, after the appraisal is done and the maximum amount they can borrow is displayed, they will need to send the NFT to our NFTHolder SC (that implements the Receiver interface) and then this method will be called from our UI, with all the loan details filled in by the user. If all the conditions are met (the liquidity pool holds at least 5 times more WETH than the requested amount and the NFT was sent to our contract) the requested amount will be sent to the borrower

loanPaid -> when the user wants to pay the loan, he will see in the UI the debt amount. He will do the transaction from his wallet and input the tx hash for us to check if the loan was paid. Then, this method will be called so that the loan record for this borrower will be deleted and his NFT will be sent back to him

getLoanData -> a getter function that returns the details of user’s loan

loanDefault -> this method can be called by anyone that monitors the current loans and it will check if the loan period has indeed passed. In the case of a default, the NFT placed as collateral will be marked as auctionable in the Auctionable Smart Contract

depositTokens -> this method is for the liquidity providers to transfer their WETH to our pool. Firstly, it checks if the MasterWallet SC was approved by the WETH owner to spend the amount the owner wants to stake. In this case, it will transfer this amount from the owner's balance to itself and mint an equal amount of czWETH tokens to the liquidity provider’s wallet. These tokens represent their contribution to our pool.

withdrawFund -> this method can be called by a liquidity provider who wants to withdraw their WETH from our Wallet. It checks the corresponding czWETH balance of the user and if it’s higher than the withdraw amount, the WETh is transferred from our Wallet back to the provider and an equivalent amount of czWETH is burned from their wallet.

getBalanceofSC -> returns the WETH balance of the MasterWallet

There are also some governance methods that can only be called by the account that deployed the smart contract. In the future, we aim to create a DAO that will handle the governance.
	-changeInterest, changeManager, changeHolder, changeAuctionable

#### NFTholder

This smart contract inherits from IERC721Receiver to be able to receive the NFT sent by a borrower. It also has a function for transferring the NFT. Only allowed addresses can call the transfer method. Right now, only the MasterWallet and the Auctionable contracts are allowed.

#### Auctionable

This smart contract handles the auctions for all NFTs that were marked as being auctionable (the borrower has defaulted)

Methods:

	- markAsAuctionable -> called from the MasterWallet loanDefault method when a default is detected
	- tokenizeNFT -> all liquidity providers who staked more than 5 WETH are eligible to take part in the auction. From the eligible providers, we randomly select 100 who will have the right to participate. This method is called from the backend after we chose the auction participants. The method will deploy a new TokenNFT smart contract for the given NFT and will also call the airdrop method from the TokenNFT. This function is essentially sending a custom ERC20 token only to the 100 users that are allowed to bid on the NFT. 
	- startAuction -> this method is called from our backend when we wish to start the auction for a given NFT. The NFT needs to be tokenised by now. A new Auction smart contract is deployed and the NFT is marked as being inAuction
	- closeAuction -> called from our backend when we want to close the auction ( when the debt + interest is covered or the auction time expired). It will call the endAuction method from the corresponding Auction smart contract, it will send the NFT to the winner and it will also destruct the TokenNFT smart contract corresponding to the auctioned NFT since there is no use for it anymore.

#### TokenNFT

This smart contract is deployed whenever an NFT needs to be tokenised for an auction. It inherits the ERC20 and AccessControll contracts from OpenZeppelin, but it contains other methods as well.

Methods:

	- airdrop -> called from the tokenizeNFT method of the Auctionable smart contract, it will send the NFT token to all 100 providers that have the right to bid in the coming auction.
	- kill -> called from the closeAuction method of the AUctionable smart contract, it calls the selfdestruct() method that wipes the storage and all the data corresponding to this contract
	- getNFTAddr -> getter for the NFT address
	- getTokenId -> getter for the NFT tokenId
	- getOwners -> getter for the allowed bidders array

#### Auction

This smart contract is deployed from the startAuction method of the Auctionable smart contract

Methods:

	- sendBid -> can be called only by owners of the NFT token that was distributed to eligible bidders when the NFT was tokenised. The total bid amount of the sender has to be higher than the current maximum bid and also higher than the debt + interest, as the goal of the auction is to cover all the expenses incurred when the borrower defaulted. The method checks if the sender has approved the Auction smart contract to spend the bid amount from the WETH contract (WETH is used here to testing purposes but it can be any other token, it has to be the same as the debtToken). If the allowance was granted, the method will transfer the bid amount to the Auction smart contract balance, will set the current bid, and will update the bid amount for the particular bidder.
	- endAuction -> called from the closeAuction method of the Auctionable smart contract. It marks the auction as ended, it returns the address of the winner and his winning bis and it emits the winningBid event.
	- getBidBack -> the bidders who did not win will call this method to get back their bid amount from the Auction smart contract. The method can only be called once the auction was marked as ended. The winner cannot call this method

#### czWETH

This is an ERC20 token that implements both mint and burn methods. Initially, the MINTER_ROLE and BURNER_ROLE are set to be the MasterWallet contract. The mint method is called whenever a liquidity provider deposits a token (WETH in our case ) and will get back czToken (czWETH here). The burn method is called when they withdraw their contribution from the MasterWallet. The smart contract uses the OpenZeppelin implementation

#### CZR

This is our governance token. It has mint and burn methods. The minter and burner are set to be the same as the address who deployed the smart contract, for the moment. Once we define how exactly the governance token fits into our platform, we will start minting and distributing it.

## Local Development

- Install dependencies\
  `yarn`

- Serve the example on localhost\
  `yarn start`

### Project License: GPL3

LICENSE SYNOPSIS

**_TL;DR_*** Here's what the license entails:

```markdown
1. Anyone can copy, modify and distribute this software.
2. You have to include the license and copyright notice with each and every distribution.
3. You can use this software privately.
4. You can use this software for commercial purposes.
5. If you dare build your business solely from this code, you risk open-sourcing the whole code base.
6. If you modify it, you have to indicate changes made to the code.
7. Any modifications of this code base MUST be distributed with the same license, GPLv3.
8. This software is provided without warranty.
9. The software author or license can not be held liable for any damages inflicted by the software.
```

More information on about the [LICENSE can be found here](http://choosealicense.com/licenses/gpl-3.0/)
