import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './Slider.module.scss'
import { ISlide } from './slider.interface'

interface ISliderItem {
	slide: ISlide
	buttonTitle?: string
}

const SliderItem: FC<ISliderItem> = ({ slide, buttonTitle = 'Смотреть' }) => {
	const { push } = useRouter()
	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					layout="fill"
					className={styles.image}
					src={slide.bigPoster}
					alt={slide.title}
					draggable={false}
					unoptimized
					priority
				/>
			)}

			<div className={styles.slide__content}>
				<h2 className={styles.slide__title}>{slide.title}</h2>
				<h3 className={styles.slide__subtitle}>{slide.subTitle}</h3>
				<button
					className={styles.slide__btn}
					onClick={() => push(slide.link)}
				>
					{buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default SliderItem
