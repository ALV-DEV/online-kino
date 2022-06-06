import React from 'react'

import MoviesAdmin from '@/components/screens/admin/Movies/MoviesAdmin'

import { NextPageAuth } from '@/shared/types/auth.types'

const MoviesPage: NextPageAuth = () => {
	return (
		<div>
			<MoviesAdmin />
		</div>
	)
}

MoviesPage.isOnlyAdmin = true

export default MoviesPage
