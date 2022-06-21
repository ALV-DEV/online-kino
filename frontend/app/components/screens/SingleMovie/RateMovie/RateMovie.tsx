import { FC } from 'react'
import StarRating from 'react-star-rating-component'

import AuthButton from '@/components/ui/VideoPlayer/AuthPlaceholder/AuthButton'

import { useAuth } from '@/hooks/useAuth'

import styles from './RateMovie.module.scss'
import { IRateMovie } from './rate.interface'
import { useRateMovie } from './useRateMovie'

const RateMovie: FC<IRateMovie> = ({ id, slug }) => {
	const { handleClick, isSended, rating } = useRateMovie(id)
	const { user } = useAuth()
	return (
		<div className={styles.rating}>
			<h3>Как вам фильм ?</h3>
			<p>Поставьте оценку, ваше мнение для нас важно</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.rating__thanks}>Спасибо !</div>
					) : (
						<StarRating
							name="start-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
