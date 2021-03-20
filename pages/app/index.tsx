import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components';

import { useEagerConnect, useInactiveListener } from '../../hooks'
import { Header } from '../../components/Header/Header'
import { defaultTheme, ThemeProvider } from 'evergreen-ui';
import Web3ReactManager from '../../components/Web3ReactManager';
import Deposit from './deposit';
import Dashboard from './dashboard';
import Borrow from './borrow';

export default function() {
  return (
    <App />
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
  return (
    <>
      <Web3ReactManager>
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact strict path="/app/dashboard" component={Dashboard} />
            <Route exact strict path="/app/deposit" component={Deposit} />
            <Route exact strict path="/app/borrow" component={Borrow} />
            <Redirect to="/app/dashboard" />
          </Switch>
        </BrowserRouter>
      </Web3ReactManager>
    </>
  )
}