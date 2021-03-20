import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ButtonWrapper, Hint, InputWrapper, SecondaryButton, StyledInput, Wrapper } from '../../utils/theme'

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
`

export default function Repay() {
  const history = useHistory()

  return (
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
          <SecondaryButton onClick={() => history.push('/app/repaid')}>Pay Back Now</SecondaryButton>
        </ButtonWrapper>
      </Tile>
    </Wrapper>
  )
}
