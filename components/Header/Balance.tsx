import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units';
import styled from 'styled-components';

export function Balance() {
    const { account, library, chainId } = useWeb3React()
    const { active, error } = useWeb3React()
  
    const [balance, setBalance] = React.useState()
    React.useEffect((): any => {
      if (!!account && !!library) {
        let stale = false
  
        library
          .getBalance(account)
          .then((balance: any) => {
            if (!stale) {
              setBalance(balance)
            }
          })
          .catch(() => {
            if (!stale) {
              setBalance(null)
            }
          })
  
        return () => {
          stale = true
          setBalance(undefined)
        }
      }
    }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  
    return (
      <>
        {active && account ? 
          <span>{balance === null ? 'Error' : balance ? `Ξ${formatEther(balance).substring(0, 7)}` : ''}</span>
        : null}
      </>
    )
  }