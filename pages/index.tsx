import React from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import styled from 'styled-components';

import { useEagerConnect, useInactiveListener } from '../hooks'
import { Header } from '../components/Header/Header'
import { defaultTheme, ThemeProvider } from 'evergreen-ui';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}

// function BlockNumber() {
//   const { chainId, library } = useWeb3React()

//   const [blockNumber, setBlockNumber] = React.useState<number>()
//   React.useEffect((): any => {
//     if (!!library) {
//       let stale = false

//       library
//         .getBlockNumber()
//         .then((blockNumber: number) => {
//           if (!stale) {
//             setBlockNumber(blockNumber)
//           }
//         })
//         .catch(() => {
//           if (!stale) {
//             setBlockNumber(null)
//           }
//         })

//       const updateBlockNumber = (blockNumber: number) => {
//         setBlockNumber(blockNumber)
//       }
//       library.on('block', updateBlockNumber)

//       return () => {
//         stale = true
//         library.removeListener('block', updateBlockNumber)
//         setBlockNumber(undefined)
//       }
//     }
//   }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

//   return (
//     <>
//       <span>Block Number</span>
//       <span role="img" aria-label="numbers">
//         🔢
//       </span>
//       <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
//     </>
//   )
// }

function App() {
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
    <>
      <Header/>
    </>
  )
}
