import Image from 'next/image'
import { FC } from 'react'

import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

const CollectionsImage: FC<{ collection: ICollection }> = ({
	collection: { image, title },
}) => {
	return (
		<Image
			alt={title}
			src={image || '/uploads/movie-posters/harry-askaban.jpg'}
			layout="fill"
			draggable={false}
		/>
	)
}

export default CollectionsImage
