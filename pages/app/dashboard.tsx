import { Link } from 'evergreen-ui';
import React from 'react'
import styled from 'styled-components';
import AppWrapper from '../../components/AppWrapper';
import { GridWrapper, SecondaryButton } from '../../utils/theme';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  font-size: var(--font-size-l);
  background: rgba(150,150,150,0.7);
  padding: var(--space-l) var(--space-xl);

  a {
    display: block;
    text-align: center;
    text-decoration: none;
    margin-top: auto;
  }
`

const StyledLink = styled.a`
  display: inline !important;
  color: var(--grey-light);
  text-decoration: underline;
  &:hover {
    color: var(--grey);
  }
`

export default function Dashboard() {
  const poolLiquidity = 212232405;
  const userLiquidity = 20002;
  return (
    <AppWrapper>
      <GridWrapper>
        <Tile>
          <h4>
            Current Liquidity
          </h4>
          <p>$212,232,405 / Ξ117,906</p><br/>
          <h4>
            Your Liquidity
          </h4>
          <p>$20,002 / Ξ11.11</p>
          <p>{userLiquidity/poolLiquidity*100}%</p>
        </Tile>
        <Tile>
          <h4>
            Blue-Chip NFTs
          </h4>
          <p>
            Unique and limited edition artwork, collectibles and real estate from the metaverse.
          </p>
        </Tile>
        <Tile>
          <h4>
            Your Open Loan
          </h4>
          <p>Ξ2717.5 + 20% APR for 40 days</p>
          <p>Countdown: 13d 23h 18m</p>
          <Link href='/app/repay'>
            <SecondaryButton>Repay Now</SecondaryButton>
          </Link>
        </Tile>
        <Tile>
          <h4>
            1 Loan Per User
          </h4>
          <p>
            Currently each user can only have one open loan. We're working on allowing multiple loans. Stay tuned!
          </p>
        </Tile>
        <Tile>
          <h4>NFT Auction on 30 Apr</h4>
          <p>
            Provide liquidity of more than Ξ5 before 28 Apr 00:00 UTC to get a chance to participate in the auction! 
          </p>
          <Link href='/app/lend'>
            <SecondaryButton>Add Liquidity</SecondaryButton>
          </Link>
        </Tile>
        <Tile>
          <h4>
            Your Collateral
          </h4>
          <p>Ξ5,435 (1 NFT)</p>
          <p>Le Anime #355/1573</p>
          <p>
            Contract:&nbsp;
            <StyledLink 
              href="https://etherscan.io/address/0x1124330b91faadfc211ab5cb3125f7259e943083"
              rel="nofollow noopener "
              target="_blank"
            >0x1124...3083</StyledLink>
          </p>
          <p>Token ID: 12800010355</p>
        </Tile>
      </GridWrapper>
    </AppWrapper>
  )
}