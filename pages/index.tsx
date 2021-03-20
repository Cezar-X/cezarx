import React from 'react'
import router from 'next/router'
import Image from 'next/image'
import { Button } from 'evergreen-ui'
import styled from 'styled-components'

const LandingBanner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  background-image: url('/images/caesar.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;

  div {
    position: absolute;
    top: 48%;
    right: 0;
    width: 640px;
    padding: 60px 80px;
    background-color: var(--bg-blue);
  }

  q {
    position: relative;
    font-size: 40px;
    font-family: 'Sorts Mill Goudy', serif;

    &:before {
      content: '“';
      top: -30px;
      left: -40px;
    }

    &:after {
      content: '”';
      bottom: -30px;
      right: -40px;
    }

    &:before,
    &:after {
      position: absolute;
      font-size: 80px;
    }
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
      <LandingBanner>
        <div>
          <q>Render unto Caesar the things which are Caesar's, and unto God the things that are God's.</q>
          <StyledButton onClick={() => router.push('/app')}>Enter App</StyledButton>
        </div>
      </LandingBanner>
    </>
  )
}