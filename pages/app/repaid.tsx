import Link from 'next/link'
import React from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import AppWrapper from '../../components/appWrapper'
import { ButtonWrapper, SecondaryButton, Wrapper } from '../../utils/theme'

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

  input {
    max-width: 80%;
  }

  p {
    margin-bottom: var(--space-xs);
  }

  h4 {
    text-align: center;
  }

  a {
    text-decoration: none;
  }
`

export default function Repaid() {
  return (
    <AppWrapper>
      <Wrapper>
        <Tile>
          <h3>
            Loan Repaid
          </h3>
          <p>Thanks for the repayment. If you love NFTs, become our liquidity provider! We hold exclusive auctions from time to time for our liquidity providers.</p>
          <ButtonWrapper>
            <Link href='/app/lend'>
              <SecondaryButton>Add Liquidity</SecondaryButton>
            </Link>
          </ButtonWrapper>
        </Tile>
      </Wrapper>
    </AppWrapper>
  )
}
