import { useQuery } from 'react-query'

import userService from '@/services/user.service'

export const useFavorites = () => {
	const { isLoading, data, refetch } = useQuery(
		'get favorites movies',
		() => userService.getFavorites(),
		{
			select: ({ data }) => data,
		}
	)

	return {
		isLoading,
		favoriteMovies: data?.favorites,
		refetch,
	}
}
