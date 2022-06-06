import ActorsAdmin from '@/components/screens/admin/Actors/Actors'

import { NextPageAuth } from '@/shared/types/auth.types'

const ActorsPage: NextPageAuth = () => {
	return (
		<div>
			<ActorsAdmin />
		</div>
	)
}

ActorsPage.isOnlyAdmin = true

export default ActorsPage
