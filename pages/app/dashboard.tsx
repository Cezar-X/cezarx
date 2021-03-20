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
            Your Collateral
          </h4>
          <p>Ξ7247 (1 NFT)</p><br/>
          <h4>
            Your Borrowing Power
          </h4>
          <p>Ξ7247 * 50% = Ξ362</p><br/>
          <SecondaryButton onClick={() => history.push('/app/borrow')}>Borrow Now</SecondaryButton>
        </Tile>
        <Tile>
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
            Appraise Your NFT
          </h4>
          <p>
            You can appraise your NFT to see how much loan you will be eligible for before depositing the NFT as collateral.
          </p><br/>
          <SecondaryButton onClick={() => history.push('/app/appraise')}>Appraise</SecondaryButton>
        </Tile>
        <Tile>
          <h4>
            Exclusive Auctions
          </h4>
          <p>
            When our users default, the NFTs will be owned by the liquidity pool. Liquidity pool providers will be eligible to participate in the NFT auction held on a later date.
          </p>
        </Tile>
      </GridWrapper>
    </DashboardWrapper>
  )
}