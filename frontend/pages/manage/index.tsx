import React from 'react'

import Admin from '@/components/screens/admin/Admin'

import { NextPageAuth } from '@/shared/types/auth.types'

const Manage: NextPageAuth = () => {
	return (
		<div>
			<Admin />
		</div>
	)
}

Manage.isOnlyAdmin = true

export default Manage
