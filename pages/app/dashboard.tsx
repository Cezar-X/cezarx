import React from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components';
import { Background, DashboardWrapper, GridWrapper, SecondaryButton } from '../../utils/theme';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-l);
  background: rgba(150,150,150,0.7);
  padding: var(--space-l) var(--space-xl);

  button {
    justify-content: center;
    margin-top: auto;
  }
`

export default function Dashboard() {
  const poolLiquidity = 212232405;
  const userLiquidity = 20002;
  const history = useHistory()
  return (
    <DashboardWrapper>
      <Background/>
      <GridWrapper>
        <Tile>
          <h4>
            Current Liquidity
          </h4>
          <p>$212,232,405 / Ξ117,906</p><br/>
          <h4>
            Your Liquidity
          </h4>
          <p>$20,002 / Ξ11.11</p>
          <p>{userLiquidity/poolLiquidity*100}%</p>
        </Tile>
        <Tile>
          <h4>
            NFTs owned by Liquidity Pool
          </h4>
          <p>5</p><br/>
          <h4>
            Total worth
          </h4>
          <p>Ξ127,320</p>
        </Tile>
        <Tile>
          <h4>
            1 Loan Per User
          </h4>
          <p>
            Currently each user can only have one open loan. We're working on allowing multiple loans. Stay tuned!
          </p>
        </Tile>
        <Tile>
          <h4>
            Exclusive Auctions
          </h4>
          <p>
            When the loans default, the NFTs will be owned by the liquidity pool. Liquidity pool providers will be eligible to participate in the NFT auction held on a later date.
          </p>
        </Tile>
        <Tile>
          <h4>
            Your Collateral
          </h4>
          <p>Ξ5,435 (1 NFT)</p><br/>
          <h4>
            Your Borrowing Power
          </h4>
          <p>Ξ0</p>
          <SecondaryButton onClick={() => history.push('/app/borrowNoCollateral')}>Borrow Now</SecondaryButton>
        </Tile>
        <Tile>
          <h4>
            Appraise Your NFT
          </h4>
          <p>
            Check your NFT to see if it will be accepted as collateral.
          </p>
          <SecondaryButton onClick={() => history.push('/app/appraise')}>Appraise</SecondaryButton>
        </Tile>
        <Tile>
          <h4>NFT Auction on 30 Apr</h4>
          <p>
            Provide liquidity of more than Ξ5 before 28 Apr 00:00 UTC to get a chance to participate in the auction! 
          </p>
          <SecondaryButton onClick={() => history.push('/app/lend')}>Add Liquidity</SecondaryButton>
        </Tile>
        <Tile>
          <h4>
            Your Open Loan
          </h4>
          <p>Ξ2717.5 + 20% APR for 40 days</p>
          <p>Countdown: 13d 23h 18m</p>
          <SecondaryButton onClick={() => history.push('/app/repay')}>Repay Now</SecondaryButton>
        </Tile>
      </GridWrapper>
    </DashboardWrapper>
  )
}