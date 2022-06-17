import cn from 'classnames'
import { FC } from 'react'

import MaterialIcon from '../../MaterialIcon'

import styles from './SliderArrow.module.scss'

interface ISliderArrow {
	variant: 'left' | 'right'
	handleArrowClick: () => void
}

const SliderArrow: FC<ISliderArrow> = ({ handleArrowClick, variant }) => {
	const isLeft = variant === 'left'

	return (
		<button
			onClick={handleArrowClick}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	)
}

export default SliderArrow
