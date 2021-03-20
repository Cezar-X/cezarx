import React from 'react'
import styled from 'styled-components';
import { ButtonWrapper, InputWrapper, SecondaryButton, StyledInput, Wrapper } from '../../utils/theme';

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

export default function Appraise() {
  return (
    <Wrapper>
      <Tile>
        <h3>Appraise NFT</h3>
        <p>
        </p>
        <ButtonWrapper>
          <SecondaryButton>Appraise</SecondaryButton>
        </ButtonWrapper>
      </Tile>
    </Wrapper>
  )
}