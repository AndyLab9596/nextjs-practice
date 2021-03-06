import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Fragment } from 'react'
import Layout from '../components/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <Fragment>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Fragment>
}

export default MyApp
