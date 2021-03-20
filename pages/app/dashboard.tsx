import React from 'react'
import styled from 'styled-components';
import { Background, DashboardWrapper, GridWrapper } from '../../utils/theme';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-l);
  background: rgba(150,150,150,0.6);
  padding: var(--space-l) var(--space-xl);
`

export default function Dashboard() {
  const poolLiquidity = 212232405;
  const userLiquidity = 20002;
  return (
    <DashboardWrapper>
      <Background/>
      <GridWrapper>
        <Tile>
          <h4>
            Current Liquidity
          </h4>
          <p>$212,232,405</p>
          <p>Ξ117,906</p>
        </Tile>
        <Tile>
          <h4>
            NFTs owned by Liquidity Pool
          </h4>
          <p>5</p>
        </Tile>
        <Tile>
          <h4>
            Your Liquidity
          </h4>
          <p>$20,002</p>
          <p>Ξ11.11</p>
          <p>{userLiquidity/poolLiquidity*100}%</p>
        </Tile>
        <Tile>
          <h4>
            Your Collateral
          </h4>
          <p>$13,046</p>
          <p>1 NFT</p>
        </Tile>
        <Tile>
          <h4>
            Your Borrowing Power
          </h4>
          <p>$13,046 * 50% = $6,523</p>
        </Tile>
      </GridWrapper>
    </DashboardWrapper>
  )
}