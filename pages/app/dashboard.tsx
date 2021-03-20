import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: var(--body-height);
  padding-top: var(--space-xxxl);
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  font-size: var(--font-size-l);
  color: var(--grey-darkest);
  background: white;
  padding: var(--space-l) var(--space-xl);
  margin: var(--space-l);
`

export default function Dashboard() {
  const poolLiquidity = 212232405;
  const userLiquidity = 20002;
  return (
    <Wrapper>
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
    </Wrapper>
  )
}