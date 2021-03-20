import React from 'react'
import styled from 'styled-components';
import { useHistory } from "react-router-dom"
import { ButtonWrapper, SecondaryButton, Wrapper } from '../../utils/theme';

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
    margin-bottom: 0;
  }
`

export default function BorrowNoCollateral() {
  const history = useHistory()
  return (
    <Wrapper>
      <Tile>
        <h3>Borrow WETH</h3>
        <p>
          Before you can borrow WETH, you'll have to first deposit a NFT.<br/><br/>
          Let's check if your NFT is a suitable collateral!
        </p>
        <ButtonWrapper>
          <SecondaryButton onClick={() => history.push('/app/appraise')}>Appraise NFT</SecondaryButton>
        </ButtonWrapper>
      </Tile>
    </Wrapper>
  )
}