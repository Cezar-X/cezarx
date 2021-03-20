import React from 'react'
import styled from 'styled-components';
import { Balance } from '../../components/Header/Balance';
import { Header } from '../../components/Header/Header';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: var(--body-height);
  padding-top: var(--space-xxxl);
`

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

export default function Borrow() {
  return (
    <Wrapper>
      <Tile>
        <h3>Borrow</h3>
        <p>
        </p>
      </Tile>
    </Wrapper>
  )
}