import { useQuery } from 'react-query'

import genreService from '@/services/genre.service'

import { IMenuItem } from '../menu.interface'

export const usePopularGenres = () => {
	const data = useQuery(
		'get popular genres for menu',
		() => genreService.getPopularGenres(),
		{
			select: ({ data }) =>
				data
					.filter((genre) => genre.icon)
					.map(
						(genre) =>
							({
								icon: genre.icon,
								link: `/genre/${genre.slug}`,
								title: genre.name,
							} as IMenuItem)
					)
					.splice(0, 4),
		}
	)

	return data
}
