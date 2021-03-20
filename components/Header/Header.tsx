import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Logo } from '../Logo'
import { Account } from './Account'
import { Balance } from './Balance'
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-m);
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  margin: 0 var(--space-m) 0 auto;

  a {
    margin: 0 var(--space-s);
  }
`;

const StyledLink = styled(Link)`
  font-size: var(--font-size-m);
  color: var(--body-text-color);
  text-decoration: none;

  &:hover {
    color: var(--grey-light);
  }
`

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
  const router = useRouter();
  const isLanding = router.pathname == "/";

  return (
    <StyledHeader>
      <a href="/">
        <Logo width="100" height="20"/>
      </a>
      {
        isLanding ? 
          <Menu>
            <StyledLink to="/faq">FAQ</StyledLink>
            <StyledLink to="/about">About</StyledLink>
          </Menu>
          : 
          <>
            <Menu>
              <StyledLink to="/app/dashboard">Dashboard</StyledLink>
              <StyledLink to="/app/deposit">Deposit</StyledLink>
              <StyledLink to="/app/borrow">Borrow</StyledLink>
              <StyledLink to="/app/underconstruction">Appraise</StyledLink>
              <StyledLink to="/app/auction">Auction</StyledLink>
              <StyledLink to="/app/underconstruction">Stats</StyledLink>
            </Menu>
            <UserDetails>
              <Account />
              <Balance />
            </UserDetails>
          </>
      }
    </StyledHeader>
  )
}