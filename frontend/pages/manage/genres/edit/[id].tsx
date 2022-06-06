import React from 'react'

import GenreEdit from '@/components/screens/admin/Genres/edit/GenreEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const EditGenrePage: NextPageAuth = () => {
	return (
		<div>
			<GenreEdit />
		</div>
	)
}

EditGenrePage.isOnlyAdmin = true

export default EditGenrePage
