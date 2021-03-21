import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { mockNFTDetails } from '../../mock/mockData';
import { ButtonWrapper, Hint, ImgWrapper, SecondaryButton, StyledInput, TextLink, Wrapper } from '../../utils/theme';
import Units from 'ethereumjs-units'
import { Link } from 'evergreen-ui';
import AppWrapper from '../../components/AppWrapper';

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

  a {
    font-size: var(--font-size-m) !important;
  }
`

export default function Appraise() {
  const [nftData, setNftData] = useState(mockNFTDetails)
  const [contractAddress, setContractAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [isAppraising, setIsAppraising] = useState(false)
  const [passAppraisal, setPassAppraisal] = useState(false)
  const [isInvalidURL, setIsInvalidURL] = useState(false)

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
        setIsAppraising(true)
        setNftData(data)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    appraise()
  }, [nftData])
  function appraise() {
    if (!nftData) {
      return
    }
    if (!nftData?.last_sale) {
      setPassAppraisal(false)
      return
    }
    if (parseInt(Units.convert(nftData?.last_sale?.total_price, 'wei', 'eth')) >= 8 && nftData?.num_sales >= 2) {
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

  function processOpenSeaURL(event) {
    const url = event.target.value
    const regexPattern = /^(https:\/\/opensea.io\/assets\/).+\/\d+/g
    if (url.match(regexPattern)) {
      const idPart = url.split("https://opensea.io/assets/")[1]
      const idParts = idPart.split("/")
      setIsInvalidURL(false)
      setContractAddress(idParts[0])
      setTokenId(idParts[1])
    } else {
      setIsInvalidURL(true)
    }
  }

  return (
    <AppWrapper>
      <Wrapper>
        <Tile>
          <h3>Appraise NFT</h3>
          {
            !(isAppraising && nftData) ?
            <NFTidWrapper>
              <p>Paste the OpenSea link below.</p>
              <div>
                <span>NFT OpenSea URL</span>
                <StyledInput
                  title="NFT OpenSea URL"
                  type="text"
                  onChange={processOpenSeaURL}
                />
              </div>
              {isInvalidURL ? <Hint>Invalid OpenSea URL. Please try again.</Hint> : null}
            </NFTidWrapper>
            : null
          }
          {
            isAppraising && nftData ? 
            <NFTDetailsWrapper>
              <ImgWrapper>
                <img src={nftData?.image_url || nftData?.asset_contract?.image_url} />
              </ImgWrapper>
              <h4>{nftData?.name}</h4>
              <p>
                { nftData?.last_sale ? <> Last Sale Price: Ξ{Units.convert(nftData?.last_sale?.total_price, 'wei', 'eth')}<br/></> : null }
                Total Number of Sales: {nftData?.num_sales}<br/>
                { nftData?.last_sale && passAppraisal ? <> Potential Borrowing Power: Ξ{Units.convert(nftData?.last_sale?.total_price, 'wei', 'eth') / 2}<br/></> : null }
              </p>
              <p>
                {
                  passAppraisal ? 
                  <>This NFT has met our collateral criteria. <Link href="/app/deposit"><TextLink>Deposit</TextLink></Link> it now to start borrowing!</>
                  : `This NFT has not met our collateral criteria. Try with another NFT.`
                }
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
    </AppWrapper>
  )
}