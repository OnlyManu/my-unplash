import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { picturesStore } from '../lib/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={picturesStore}>
      <Component {...pageProps} />
    </Provider>
  )
}
