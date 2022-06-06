import ActorsAdmin from '@/components/screens/admin/Actors/Actors'
import GenresAdmin from '@/components/screens/admin/Genres/GenresAdmin'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenresPage: NextPageAuth = () => {
	return (
		<div>
			<GenresAdmin />
		</div>
	)
}

GenresPage.isOnlyAdmin = true

export default GenresPage
