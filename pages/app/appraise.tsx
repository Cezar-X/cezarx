import React, { useState } from 'react'
import styled from 'styled-components';
import { mockNFTDetails } from '../../mock/mockData';
import { ButtonWrapper, Hint, SecondaryButton, StyledInput, TextLink, Wrapper } from '../../utils/theme';
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
  const [contractAddress, setContractAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [isAppraising, setIsAppraising] = useState(false)
  const [passAppraisal, setPassAppraisal] = useState(false)

  function fetchData() {
    fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`)
      .then(response => {
        if (response.status !== 200) {
          console.error(`Error. Status code: ${response.status}`);
          return
        }
        return response.json()
      })
      .then(data => {
        setNftData(data)
        setIsAppraising(true)
        appraise()
      })
      .catch(error => console.log(error))
  }

  function appraise() {
    if (Units.convert(nftData?.last_sale?.total_price, 'wei', 'eth') >= 8 && nftData?.num_sales >= 2) {
      setPassAppraisal(true)
    } else {
      setPassAppraisal(false)
    }
  }

  function handleAppraiseButtonOnClick() {
    if (contractAddress != "" && tokenId != "") {
      fetchData()
    }
  }

  return (
    <Wrapper>
      <Tile>
        <h3>Appraise NFT</h3>
        {
          !(isAppraising && nftData) ?
          <NFTidWrapper>
            <div>
              <span>NFT Contract Address</span>
              <StyledInput
                title="Token Amount"
                inputMode="decimal"
                type="text"
                onChange={event => setContractAddress(event.target.value)}
              />
            </div>
            <div>
              <span>NFT Token ID</span>
              <StyledInput
                title="Token Amount"
                inputMode="decimal"
                type="text"
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
            <SecondaryButton
              onClick={handleAppraiseButtonOnClick}
              disabled={contractAddress == "" || tokenId == ""}
            >Appraise</SecondaryButton>
          </ButtonWrapper>
        }
        {
          isAppraising && !nftData ?
          <Hint>No NFT found. Please try again.</Hint>
          : <></>
        }
      </Tile>
    </Wrapper>
  )
}