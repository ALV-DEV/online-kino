import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import userService from '@/services/user.service'

import { errosRequest } from '@/utils/erros'

import { useFavorites } from '../../Layout/Sidebar/Movies/FavoriteMovies/useFavorites'

import styles from './FavoritesButton.module.scss'

// import HeartImg from './heart-animation.png'

const FavoritesButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoriteMovies, refetch } = useFavorites()

	useEffect(() => {
		if (favoriteMovies) {
			const isHasMovie = favoriteMovies.some((f) => f._id === movieId)
			if (isSmashed !== isHasMovie) {
				setIsSmashed(isHasMovie)
			}
		}
	}, [movieId, isSmashed, favoriteMovies])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => userService.updateFavorites(movieId),
		{
			onError: (error) => {
				errosRequest(error, 'Update favorites')
			},
			onSuccess: () => {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)
	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		></button>
	)
}

export default FavoritesButton
