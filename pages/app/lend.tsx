import React, { useState } from 'react'
import styled from 'styled-components'
import { Balance } from '../../components/Header/Balance'
import { ButtonWrapper, InputWrapper, SecondaryButton, StyledInput, Wrapper } from '../../utils/theme'
import AppWrapper from '../../components/AppWrapper'

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
    margin-bottom: var(--space-m);
  }
`


export default function Lend() {
  const [lent, setLent] = useState(false)

  return (
    <AppWrapper>
      <Wrapper>
        {
          !lent ? 
            <Tile>
            <h3>Lend WETH</h3>
            <p>
              Available Balance: <Balance /><br/>
              Deposit APY: 13%
            </p>
            <InputWrapper>
              <StyledInput
                title="Token Amount"
                inputMode="decimal"
                type="number"
                placeholder="0.0"
                minLength={1}
                maxLength={20}
              />
              WETH
            </InputWrapper>
            <ButtonWrapper>
              <SecondaryButton onClick={() => setLent(true)}>Deposit</SecondaryButton>
            </ButtonWrapper>
          </Tile>
          : 
          <Tile>
            <h3>Deposit Successful</h3>
            <p>
              You have received 1,803 czWETH. They represent your stake in the liquidity pool.
            </p>
          </Tile>
        }
      </Wrapper>
    </AppWrapper>
  )
}
