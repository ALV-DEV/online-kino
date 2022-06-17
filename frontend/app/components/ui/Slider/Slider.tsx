import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './Slider.module.scss'
import SliderArrow from './SliderArrow/SliderArrow'
import SliderItem from './SliderItem'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const {
		currentIdx,
		handleArrowClick,
		isExistsNext,
		isExistsPrev,
		slideIn,
	} = useSlider(slides.length)
	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SliderItem
					slide={slides[currentIdx]}
					buttonTitle={buttonTitle}
				/>
			</CSSTransition>
			{isExistsPrev && (
				<SliderArrow
					variant="left"
					handleArrowClick={() => handleArrowClick('prev')}
				/>
			)}

			{isExistsNext && (
				<SliderArrow
					variant="right"
					handleArrowClick={() => handleArrowClick('next')}
				/>
			)}
		</div>
	)
}

export default Slider
