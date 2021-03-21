import React from 'react'
import styled from 'styled-components';
import AppWrapper from '../../components/AppWrapper';
import { Wrapper } from '../../utils/theme';

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
`

export default function UnderConstruction() {
  return (
    <AppWrapper>
      <Wrapper>
        <Tile>
          <h3>Under Construction</h3>
          <p>
            Come back later!
          </p>
          <iframe src="https://giphy.com/embed/1wbV299AFXDaZLjj7j" width="100%" height="480" frameBorder="0" allowFullScreen></iframe>
        </Tile>
      </Wrapper>
    </AppWrapper>
  )
}