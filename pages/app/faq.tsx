import React from 'react'
import styled from 'styled-components';
import AppWrapper from '../../components/appWrapper';
import { Wrapper } from '../../utils/theme';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  font-size: var(--font-size-l);
  color: var(--grey-darkest);
  background: white;
  padding: var(--space-l) var(--space-xl);
  margin: var(--space-l);
  border-radius: 12px;
  box-shadow: var(--box-shadow);

  div {
    margin: var(--space-s) auto;
  }
`

export default function FAQ() {
  return (
    <AppWrapper>
      <Wrapper>
        <Tile>
          <h3>FAQ</h3>
          <p>
            CezarX is a collateral lending protocol that enables collectors to take out a fixed-rate loan using their NFT as collateral. The loan is funded by liquidity providers who earn interest paid by the borrower. In the event of a default on the loan ownership of the NFT is fractionalized and transferred to the liquidity providers. An exclusive auction is held where only the liquidity providers are eligible to bid.
          </p>
          <div>
            <h4>How much can I borrow against my NFT?</h4>
            <p>
              A loan can be taken out for up to 50% of the CezarX appraisal value. A fixed-rate of 10% interest is charged for the term loan.
            </p>
          </div>
          <div>
            <h4>What kind of NFTs do you accept?</h4>
            <p>
              Unique and limited edition artwork, collectibles and real estate from the metaverse with a floor price of 30 ETH are accepted as loan collateral. 
            </p>
          </div>
          <div>
            <h4>
              Can I extend the term limit of my loan?
            </h4>
            <p>
              Our smart contracts are trustless and automated. They take possession of your collateral if the loan is not paid by the agreed upon date and time.
            </p>
          </div>
        </Tile>
      </Wrapper>
    </AppWrapper>
  )
}