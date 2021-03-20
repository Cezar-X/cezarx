import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Logo } from '../Logo'
import { Account } from './Account'
import { Balance } from './Balance'
import { NavLink, Link } from "react-router-dom";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuSubwrapper = styled.div`
  padding: var(--space-m);
`

const Menu = styled.div`
  display: flex;
  justify-self: flex-end;
  align-self: stretch;
  margin: 0 var(--space-m) 0 auto;

  a {
    margin: 0 var(--space-s);
  }
`

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  position: relative;
  font-size: var(--font-size-m);
  color: var(--body-text-color);
  text-decoration: none;

  &:hover,
  &.is-active {
    color: var(--grey-light);
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    left: 50%;
    bottom: 0;
    background: linear-gradient(12deg, rgba(129,129,129,1) 0%, rgba(139,139,139,1) 52%, rgba(115,115,115,1) 100%);
    transform: translateX(-50%);
    transition: all 0.15s;
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
      <MenuSubwrapper>
      {isLanding ?
        <a href="/">
          <Logo width="100" height="20"/>
        </a>
        :
        <Link to="/app/dashboard">
          <Logo width="100" height="20"/>
        </Link>
      }
      </MenuSubwrapper>
      {
        isLanding ? 
          <Menu>
            <StyledLink activeClassName='is-active' to="/faq">FAQ</StyledLink>
            <StyledLink activeClassName='is-active' to="/about">About</StyledLink>
          </Menu>
          : 
          <>
            <Menu>
              <StyledLink activeClassName='is-active' to="/app/borrowNoCollateral">Borrow</StyledLink>
              <StyledLink activeClassName='is-active' to="/app/lend">Lend</StyledLink>
              <StyledLink activeClassName='is-active' to="/app/auction">Auction</StyledLink>
              <StyledLink activeClassName='is-active' to="/faq">FAQ</StyledLink>
            </Menu>
            <MenuSubwrapper>
              <UserDetails>
                <Account />
                <Balance />
              </UserDetails>
            </MenuSubwrapper>
          </>
      }
    </StyledHeader>
  )
}