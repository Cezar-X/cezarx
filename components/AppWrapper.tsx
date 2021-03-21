import React from 'react'
import { Background, DashboardWrapper } from '../utils/theme';
import { Header } from './Header/Header';

export default function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header/>
      <DashboardWrapper>
        <Background/>
        {children}
      </DashboardWrapper>
    </>
  )
}