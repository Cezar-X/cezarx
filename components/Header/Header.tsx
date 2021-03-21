import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Logo } from '../Logo'
import { Account } from './Account'
import { Balance } from './Balance'
import Link from 'next/link'

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
  }
`

const UserDetails = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 270px;
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
        <Link href={isLanding ? "/" : "/app/dashboard"}>
          <a><Logo width="100" height="20"/></a>
        </Link>
      </MenuSubwrapper>
      <Menu>
        <Link href="/app/borrowNoCollateral">
          <a 
            className={router.pathname === "/app/borrowNoCollateral" ? "is-active" : ""}
          >Borrow</a>
        </Link>
        <Link href="/app/lend">
          <a 
            className={router.pathname === "/app/lend" ? "is-active" : ""}
          >Lend</a>
          </Link>
        <Link href="/app/auction">
          <a 
            className={router.pathname === "/app/auction" ? "is-active" : ""}
          >Auction</a>
        </Link>
        <Link href="/app/faq">
          <a
            className={router.pathname === "/app/faq" ? "is-active" : ""}
          >FAQ</a>
        </Link>
      </Menu>
      <MenuSubwrapper>
        <UserDetails>
          <Account />
          <Balance />
        </UserDetails>
      </MenuSubwrapper>
    </StyledHeader>
  )
}