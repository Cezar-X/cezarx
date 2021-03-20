import { Button, Pane, Paragraph, Tab, Tablist, TextInput } from 'evergreen-ui'
import React from 'react'
import styled from 'styled-components'
import { Balance } from '../../components/Header/Balance'
import { Header } from '../../components/Header/Header'
import { ButtonWrapper, SecondaryButton, StyledInput, Wrapper } from '../../utils/theme'

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

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function Deposit() {
  return (
    <Wrapper>
      <Tile>
        <h3>Deposit WETH</h3>
        <p>
          Available Balance: <Balance />
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
          <SecondaryButton>Deposit</SecondaryButton>
        </ButtonWrapper>
      </Tile>
    </Wrapper>
  )
}
