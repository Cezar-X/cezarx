import { Link } from 'evergreen-ui'
import React from 'react'
import styled from 'styled-components'
import AppWrapper from '../../components/AppWrapper'
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

export default function Repay() {
  return (
    <AppWrapper>
      <Wrapper>
        <Tile>
          <h3>
            Repay Loan
          </h3>
          <p>Loan Amount: Ξ2717.5</p>
          <p>20% APR for 40 days</p>
          <p>13d 23h 18m Until Deadline</p>
          <h4>3074.86986 WETH</h4>
          <ButtonWrapper>
            <Link href='/app/repaid'>
              <SecondaryButton>Pay Back Now</SecondaryButton>
            </Link>
          </ButtonWrapper>
        </Tile>
      </Wrapper>
    </AppWrapper>
  )
}
