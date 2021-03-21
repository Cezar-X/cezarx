import React from 'react'
import styled from 'styled-components';
import { Header } from '../../components/Header/Header';
import { ImgWrapper } from '../../utils/theme';

const AuctionPageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  font-size: var(--font-size-l);
  height: var(--body-height);
  background: white;
  padding-top: var(--space-xxxl);

  h3 {
    color: var(--grey-darkest);
  }
`

const PageContentWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(3, auto);
  gap: var(--space-l);
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  color: var(--grey-darkest);
  background: white;
  padding: var(--space-l) var(--space-l);
  margin: var(--space-l);
  border: 2px solid;
  box-shadow: 10px 10px 0 rgba(0,0,0,0.08);

  a {
    color: var(--grey-light);
    &:hover {
      color: var(--grey);
    }
  }
`

export default function Auction() {
  return (
    <>
    <Header/>
    <AuctionPageWrapper>
      <h3>Current Auction</h3>
      <PageContentWrapper>
        <Tile>
        </Tile>
        <Tile>
          <h4>CryptoPunk #6487</h4>
          <p>
            Contract Address:&nbsp;
            <a href="https://etherscan.io/address/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb" rel="nofollow noopener " target="_blank">0xb47e...3bbb</a>
          </p>
          <p>Token ID: 6487</p><br/>
          <ImgWrapper>
            <img src="https://lh3.googleusercontent.com/U9b6Gnmd4sffNbzoOunRgo-F-g-Mo8wMLdN6xRI6f3y-_5fb_p5cfiYkDyqjF97_l3f5G21yZeCWpi2IN4mMgIrEbsAii2C7CQVa"/>
          </ImgWrapper>
        </Tile>
      </PageContentWrapper>
    </AuctionPageWrapper>
    </>
  )
}