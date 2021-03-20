import { Select } from 'evergreen-ui'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { Balance } from '../../components/Header/Balance'
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
    margin-bottom: var(--space-m);
  }
`

const StyledSelect = styled(Select)`
  margin-left: var(--space-xs);
  select {
    font-size: var(--font-size-l);
    background: var(--grey-lightest);
  }
`

const CopyField = styled.input`
  max-width: 100% !important;
  width: 100%;
  font-size: var(--font-size-m);
  padding: var(--space-xxs) var(--space-xs);
`

const CopyWrapper = styled.div`
  position: relative;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: var(--font-size-s);
    background-color: rgba(222,222,222,0.95);
    padding: var(--space-xs);
  }
`

const CTAWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: var(--space-l) 0 var(--space-xs);
`

export default function Lend() {
  const [isNFT, setIsNFT] = useState(false)
  const [copied, setCopied] = useState(false)
  const contractAddress = "0x123213213313213313213313213313213345435"
  const history = useHistory()

  const copyAddress = function() {
    setCopied(true)
    setTimeout(function() {
      setCopied(false)
    }, 600)
  }

  return (
    <Wrapper>
      <Tile>
        <h3>
          Lend WETH
        </h3>
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
          <SecondaryButton>Deposit</SecondaryButton>
        </ButtonWrapper>
      </Tile>
    </Wrapper>
  )
}
