import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/screens/Layout/Layout'

import { TypeComponentAuthField } from '@/shared/types/auth.types'

import { store } from '@/store/store'

import AuthProvider from './AuthProvider/AuthProvider'
import ProgressProvider from './ProgressProvider'
import ToastLibProvider from './ToastLibProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export const MainProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({
	children,
	Component,
}) => {
	return (
		<ProgressProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ToastLibProvider />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</ProgressProvider>
	)
}
