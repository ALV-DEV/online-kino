import React from 'react'

import MovieEdit from '@/components/screens/admin/Movies/edit/MovieEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const MovieEditPage: NextPageAuth = () => {
	return (
		<div>
			<MovieEdit />
		</div>
	)
}

MovieEditPage.isOnlyAdmin = true

export default MovieEditPage
