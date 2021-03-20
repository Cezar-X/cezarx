import React from 'react'
import styled from 'styled-components';
import { Wrapper } from '../../utils/theme';

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
  border-radius: 12px;
  box-shadow: var(--box-shadow);
`

export default function Auction() {
  return (
    <Wrapper>
      <Tile>
        <h3>Auction</h3>
        <p></p>
      </Tile>
    </Wrapper>
  )
}