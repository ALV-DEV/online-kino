import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthField } from '@/shared/types/auth.types'

const CheckRoleProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children,
}) => {
	const { user } = useAuth()
	const router = useRouter()

	if (user?.isAdmin) {
		return <>{children}</>
	}

	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}

	if (user && !user.isAdmin && isOnlyUser) {
		return <>{children}</>
	} else {
		router.pathname !== '/auth' && router.replace('/auth')
		return null
	}
}

export default CheckRoleProvider
