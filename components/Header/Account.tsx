import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Dialog, Pane } from 'evergreen-ui';
import { ConnectionList } from '../ConnectionList'
import { PrimaryButton } from '../../utils/theme';
import { GreenIcon } from './GreenIcon';

export function Account() {
  const { account } = useWeb3React()
  const { active, error } = useWeb3React()
  const [isShown, setIsShown] = useState(false)

  return (
    <>
      {
        <PrimaryButton onClick={() => setIsShown(true)}>
          {active && account ? 
            <><GreenIcon/>{account.substring(0, 6)}...{account.substring(account.length - 4)}</>
          : 'Connect Wallet' }
        </PrimaryButton>
      }
      <div>
        <Pane>
          <Dialog
            isShown={isShown}
            title="Connect Wallet"
            onCloseComplete={() => setIsShown(false)}
            hasFooter={false}
          >
            <ConnectionList/>
          </Dialog>
        </Pane>
      </div>
    </>
  )
}