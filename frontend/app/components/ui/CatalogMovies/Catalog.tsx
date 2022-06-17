import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import GalleryItem from '../Gallery/GalleryItem'
import Description from '../Heading/Description'
import Heading from '../Heading/Heading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const Catalog: FC<ICatalog> = ({ description, movies, title }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description
					text={description}
					className={styles.description}
				/>
			)}
			<section className={styles.movies}>
				{movies?.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							link: `/movie/${movie.slug}`,
							name: movie.title,
							posterPath: movie.bigPoster,
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
