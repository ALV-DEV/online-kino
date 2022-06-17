import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link href={item.link}>
			<a
				className={cn(styles.item, {
					[styles.item__text]: item.content,
					[styles.item__horizontal]: variant === 'horizontal',
					[styles.item__vertical]: variant === 'vertical',
				})}
			>
				<Image
					alt={item.name}
					src={item.posterPath}
					layout="fill"
					draggable={false}
					priority
				/>

				{item.content && (
					<div className={styles.item__content}>
						<h3 className={styles.item__title}>
							{item.content.title}
						</h3>
						{item.content.subTitle && (
							<h4 className={styles.item__subtitle}>
								{item.content.subTitle}
							</h4>
						)}
					</div>
				)}
			</a>
		</Link>
	)
}

export default GalleryItem
