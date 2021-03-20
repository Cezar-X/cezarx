import React, { useState, useEffect } from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import styled from 'styled-components'

import { useEagerConnect, useInactiveListener } from '../../hooks'

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`

const Message = styled.h2`
  color: ${({ theme }) => theme.secondary1};
`

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  const context = useWeb3React<Web3Provider>()
  const { connector, library, account, activate, deactivate, active, error } = context

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect()
  
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true)
    }, 600)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null
  }

  return children
}