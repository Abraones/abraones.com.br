import Head from 'next/head'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Abraones</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp