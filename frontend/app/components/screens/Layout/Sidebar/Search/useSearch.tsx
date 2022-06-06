import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import useDebounce from '@/hooks/useDebounce'

import movieService from '@/services/movie.service'

const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouceSearch = useDebounce(searchTerm, 500)
	const { data, isSuccess } = useQuery(
		['get searches movies', debouceSearch],
		() => movieService.getMovies(debouceSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouceSearch,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { isSuccess, data, handleSearch, searchTerm }
}

export default useSearch
