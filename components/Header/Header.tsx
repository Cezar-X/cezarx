import React from 'react'
import styled from 'styled-components';
import { Logo } from '../Logo';
import { Account } from './Account';
import { Balance } from './Balance';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-m);
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    line-height: 1;
    padding: var(--space-xxxs) var(--space-xxs);
    border: 1px solid;
    border-radius: 30px;
    margin-left: var(--space-xxxs);
  }
`;


export function Header() {
  return (
    <StyledHeader>
      <Logo width="100" height="20"/>
      <UserDetails>
        <Account />
        <Balance />
      </UserDetails>
    </StyledHeader>
  )
}