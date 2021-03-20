import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Header } from '../components/Header/Header'

import '../styles.css'

export default class Root extends App {
  render() {
    const { Component } = this.props

    return (
      <>
        <Head>
          <title>CezarX</title>
        </Head>

        <Header/>

        <Component />
      </>
    )
  }
}
