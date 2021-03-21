import React from 'react'
import styled from 'styled-components';
import AppWrapper from '../../components/AppWrapper';
import { Wrapper } from '../../utils/theme';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  font-size: var(--font-size-l);
  color: var(--grey-darkest);
  background: white;
  padding: var(--space-l) var(--space-xl);
  margin: var(--space-l);
  border-radius: 12px;
  box-shadow: var(--box-shadow);

  p {
    margin-bottom: var(--space-m);

    &:first-of-type {
      margin-top: var(--space-s);
    }

    &:last-child {
      text-align: center;
    }
  }

  a {
    color: var(--grey-light);
    &:hover {
      color: var(--grey);
    }
  }
`

export default function Borrow() {
  return (
    <AppWrapper>
      <Wrapper>
        <Tile>
          <h3>Borrowed WETH</h3>
          <p>
            Ξ2717.5 + 20% APR for 40 days
          </p>
          <p>
            Countdown: 39d 23h 59m
          </p>
          <p>
            <a href="#">View on Etherscan</a>
          </p>
        </Tile>
      </Wrapper>
    </AppWrapper>
  )
}