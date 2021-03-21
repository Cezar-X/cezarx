import React from 'react'
import router from 'next/router'
import { StaticRouter } from 'react-router-dom'
import { Button } from 'evergreen-ui'
import styled from 'styled-components'
import { Header } from '../components/Header/Header'

const LandingBanner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: var(--body-height);
  background-image: url('/images/caesar.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;

  div {
    position: absolute;
    top: 45%;
    right: 0;
    width: 620px;
    padding: 40px 70px;
    background-color: var(--bg-blue);
  }

  q {
    position: relative;
    font-size: 36px;
    font-family: 'Sorts Mill Goudy', serif;

    &:before {
      content: '“';
      top: -30px;
      left: -40px;
    }

    &:after {
      content: '”';
      bottom: -40px;
      right: -40px;
    }

    &:before,
    &:after {
      position: absolute;
      font-size: 80px;
    }
  }

  h1 {
    font-size: 36px;
    letter-spacing: .8px;
    line-height: 1;
    margin: var(--space-l) 0 0;
  }

  p {
    font-size: var(--font-size-l);
    font-weight 300;
    line-height: 1.5;
    margin: var(--space-m) auto var(--space-l);
  }
`

const StyledButton = styled(Button)`
  display: block;
  height: auto;
  font-family: 'Inter', sans-serif;
  font-size: var(--font-size-l);
  line-height: 1;
  padding: var(--space-s) var(--space-xl);
  background: white;
  border-radius: 0;
  margin-top: var(--space-m);
`

export default function Landing() {
  return (
    <>
      <StaticRouter>
        <Header/>
      </StaticRouter>
      <LandingBanner>
        <div>
          <q>Render unto Caesar the things which are Caesar's, and unto God the things that are God's.</q>
          <StyledButton onClick={() => router.push('/app')}>Enter App</StyledButton>
        </div>
      </LandingBanner>
    </>
  )
}