import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { mockNFTDetails } from '../../mock/mockData';
import { ButtonWrapper, SecondaryButton, StyledInput, TextLink, Wrapper } from '../../utils/theme';
import Units from 'ethereumjs-units'

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  font-size: var(--font-size-l);
  color: var(--grey-darkest);
  background: white;
  padding: var(--space-l) var(--space-xl);
  margin: var(--space-l);
  border-radius: 12px;
  box-shadow: var(--box-shadow);

  h3 {
    margin-bottom: var(--space-s);
  }

  p {
    margin-bottom: var(--space-m);
  }
`

const NFTidWrapper = styled.div`
  div {
    margin: 0 0 var(--space-m);
    &:last-child {
      margin-bottom: 0;
    }
  }
  input {
    width: 100%;
    margin-top: var(--space-xxxs);
  }
`

const NFTDetailsWrapper = styled.div`
  font-size: var(--font-size-m);
`

const ImgWrapper = styled.div`

  img {
    display: block;
    width: 100%;
  }
`

export default function Appraise() {
  const [nftData, setNftData] = useState(mockNFTDetails)
  const [contractAddress, setContractAddress] = useState("0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb")
  const [tokenId, setTokenId] = useState("3011")
  const [isAppraising, setIsAppraising] = useState(false)
  const [passAppraisal, setPassAppraisal] = useState(false)

  function fetchData() {
    fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`)
      .then(response => response.json())
      .then(data => {
        setNftData(data)
        appraise()
      });
  }

  function appraise() {
    if (Units.convert(nftData?.last_sale?.total_price, 'wei', 'eth') >= 5 && nftData?.num_sales >= 2) {
      setPassAppraisal(true)
    } else {
      setPassAppraisal(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [contractAddress, tokenId]);

  return (
    <Wrapper>
      <Tile>
        <h3>Appraise NFT</h3>
        {
          !isAppraising ?
          <NFTidWrapper>
            <div>
              <span>NFT Contract Address</span>
              <StyledInput
                title="Token Amount"
                inputMode="decimal"
                type="text"
                placeholder="NFT contract address"
                defaultValue="0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
                onChange={event => setContractAddress(event.target.value)}
              />
            </div>
            <div>
              <span>NFT Token ID</span>
              <StyledInput
                title="Token Amount"
                inputMode="decimal"
                type="text"
                placeholder="NFT token ID"
                defaultValue="3011"
                onChange={event => setTokenId(event.target.value)}
              />
            </div>
          </NFTidWrapper>
          : null
        }
        {
          isAppraising && nftData ? 
          <NFTDetailsWrapper>
            <ImgWrapper>
              <img src={nftData?.image_url} />
            </ImgWrapper>
            <h4>{nftData?.name}</h4>
            <p>
              Last Sale Price: Ξ{Units.convert(nftData?.last_sale?.total_price, 'wei', 'eth')}<br/>
              Total Number of Sales: {nftData?.num_sales}
            </p>
            <p>
              This NFT has met our collateral criteria. <TextLink to="/app/deposit">Deposit</TextLink> it now to start borrowing!
            </p>
          </NFTDetailsWrapper>
          : 
          <ButtonWrapper>
            <SecondaryButton onClick={() => setIsAppraising(true)}>Appraise</SecondaryButton>
          </ButtonWrapper>
        }
      </Tile>
    </Wrapper>
  )
}