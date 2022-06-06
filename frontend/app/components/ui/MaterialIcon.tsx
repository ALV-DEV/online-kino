import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { TypeIconName } from '@/shared/types/icon.types'

const MaterialIcon: FC<{ name: TypeIconName }> = ({ name }) => {
	const IconComponent = MaterialIcons[name]

	return <IconComponent />
}

export default MaterialIcon
