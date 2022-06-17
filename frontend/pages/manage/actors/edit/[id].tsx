import ActorEdit from '@/components/screens/admin/Actors/edit/ActorEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const ActorEditPage: NextPageAuth = () => {
	return (
		<div>
			<ActorEdit />
		</div>
	)
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
