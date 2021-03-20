import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import App from 'next/app'
import Head from 'next/head'
import React from 'react'

import { useEagerConnect, useInactiveListener } from '../hooks'

import { Header } from '../components/Header/Header'

import '../styles.css'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default class Root extends App {
  
  render() {
    const { Component } = this.props

    return (
      <>
        <Head>
          <title>CezarX</title>
        </Head>
        <AppContent Component={Component}/>
      </>
    )
  }
}

function AppContent({Component}) {
  const context = useWeb3React<Web3Provider>()
  const { connector, library, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header/>
      <Component />
    </Web3ReactProvider>
  )
}