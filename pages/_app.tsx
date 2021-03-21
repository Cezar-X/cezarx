import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import App from 'next/app'
import Head from 'next/head'
import React from 'react'

import '../styles.css'
import Web3ReactManager from '../components/Web3ReactManager'

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
        <Web3ReactProvider getLibrary={getLibrary}>
          <Head>
            <title>CezarX - Collateral Lending Protocol</title>
            <link rel="shortcut icon" href="/images/favicon.png" />
          </Head>
          <Web3ReactManager>
            <Component/>
          </Web3ReactManager>
        </Web3ReactProvider>
      </>
    )
  }
}