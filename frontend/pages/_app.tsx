import type { AppProps } from 'next/app'
import { MainProvider } from 'providers/MainProvider'

import { TypeComponentAuthField } from '@/shared/types/auth.types'

import '@/assets/styles/globals.scss'
import '@/assets/styles/react-select.scss'

type TypeAppProps = AppProps & TypeComponentAuthField

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}

export default MyApp
