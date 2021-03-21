import { Table } from 'evergreen-ui';
import React from 'react'
import Countdown from 'react-countdown';
import styled from 'styled-components';
import { Header } from '../../components/Header/Header';
import { biddingHistory } from '../../mock/biddingHistory';
import { ImgWrapper } from '../../utils/theme';

const AuctionPageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  font-size: var(--font-size-l);
  min-height: var(--body-height);
  padding: var(--space-xl) 0 var(--space-xl);

  h3 {
    color: var(--grey-darkest);
  }
`

const PageContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-xxxl);
  padding: var(--space-l);
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: auto;
  color: var(--grey-darkest);
  background: white;
  padding: var(--space-l);
  border: 2px solid;
  box-shadow: 10px 10px 0 rgba(255,255,255,0.8);

  &:first-child {
    width: 400px;
    align-self: flex-start;
    font-size: var(--font-size-s);
  }

  a {
    color: var(--grey);
    text-decoration: none;
    &:hover {
      color: var(--grey-dark);
    }
  }

  h2 {
    margin: var(--space-m) 0 var(--space-xxs);
  }
`

const PriceTag = styled.span`
  font-size: var(--font-size-xxxl);
`

const CountdownWrapper = styled.div`
  position: absolute;
  top: var(--space-l);
  right: var(--space-l);
  line-height: 1;
  text-align: justify;

  span:last-child {
    font-size: var(--font-size-s);
  }
`

const TableWrapper = styled.div`
  margin-top: var(--space-l);
`

const TableRow = styled.div`
  display: flex;
  padding: var(--space-s) 0;
`

export default function Auction() {
  return (
    <>
      <Header/>
      <AuctionPageWrapper>
        <PageContentWrapper>
          <Tile>
            <ImgWrapper>
              <img src="https://lh3.googleusercontent.com/U9b6Gnmd4sffNbzoOunRgo-F-g-Mo8wMLdN6xRI6f3y-_5fb_p5cfiYkDyqjF97_l3f5G21yZeCWpi2IN4mMgIrEbsAii2C7CQVa"/>
            </ImgWrapper>
            <h2>CryptoPunk #6487</h2>
            <p>
              Creator:&nbsp;
              <a href="https://etherscan.io/address/0xc352b534e8b987e036a93539fd6897f53488e56a" rel="nofollow noopener " target="_blank">0xC352...e56a</a>
            </p>
            <p>
              Contract Address:&nbsp;
              <a href="https://etherscan.io/address/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb" rel="nofollow noopener " target="_blank">0xb47e...3bbb</a>
            </p>
            <p>Token ID: 6487</p>
          </Tile>
          <Tile>
            <span>Last</span>
            <PriceTag>Ξ988</PriceTag>
            <CountdownWrapper>
              <Countdown date={'2021-03-23T00:02:29.000+08:00'} /><br/>
              <span>until auction ends</span>
            </CountdownWrapper>
            <TableWrapper>
              <Table style={{'border': '3px ​solid var(--grey-lightest)'}}>
                <Table.Head>
                  <Table.TextHeaderCell flexBasis={240} flexShrink={0} flexGrow={0}>
                    Bidder
                  </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={180} flexShrink={0} flexGrow={0}>
                    Last Activity
                  </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={160} flexShrink={0} flexGrow={0}>
                    Amount
                  </Table.TextHeaderCell>
                  <Table.TextHeaderCell flexBasis={120} flexShrink={1} flexGrow={1}>
                    Date
                  </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                  {biddingHistory && biddingHistory.map(bid => (
                    <TableRow key={bid.amount+bid.activity}>
                      <Table.TextCell flexBasis={240} flexShrink={0} flexGrow={0}>
                        <a href={`https://etherscan.io/address/${bid.address}`} target="_blank">{bid.address}</a>
                      </Table.TextCell>
                      <Table.TextCell flexBasis={180} flexShrink={0} flexGrow={0}>{bid.activity}</Table.TextCell>
                      <Table.TextCell flexBasis={160} flexShrink={0} flexGrow={0}>
                        {bid.amount}
                      </Table.TextCell>
                      <Table.TextCell flexBasis={120} flexShrink={1} flexGrow={1}>
                        <a href={`https://etherscan.io/tx/${bid.tx}`} target="_blank">{bid.date}</a>
                      </Table.TextCell>
                    </TableRow>
                  ))}
                </Table.Body>
              </Table>
            </TableWrapper>
          </Tile>
        </PageContentWrapper>
      </AuctionPageWrapper>
    </>
  )
}