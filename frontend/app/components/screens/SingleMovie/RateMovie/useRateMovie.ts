import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import ratingService from '@/services/rating.service'

import { errosRequest } from '@/utils/erros'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { refetch } = useQuery(
		['get rating for moie', movieId],
		() => ratingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data.value || 0)
			},
			onError: (error) => {
				errosRequest(error, 'Get Rating')
			},
			enabled: !!movieId,
		}
	)

	const { mutateAsync } = useMutation(
		'set rating for movie',
		({ value }: { value: number }) =>
			ratingService.setRating(movieId, value),
		{
			onError: (error) => {
				errosRequest(error, 'Rating error')
			},
			onSuccess: () => {
				toastr.success('Рейтинг фильма', 'Спасибо за вашу оценку :)')
				setIsSended(true)

				refetch()
				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return {
		isSended,
		rating,
		handleClick,
	}
}
