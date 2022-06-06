import { $api } from 'api/interceptors'
import instence from 'api/interceptors'

import { IMovie } from '@/shared/types/movie.types'

import { getMoviehUrl } from '@/config/api.config'

class MovieService {
	async getMovies(searchTerm?: string) {
		return $api.get<IMovie[]>(getMoviehUrl(), {
			params: searchTerm ? { searchTerm } : {},
		})
	}

	async deleteMovie(id: string) {
		return instence.delete<IMovie>(getMoviehUrl(`/${id}`))
	}

	async getMostPopularMovies() {
		return $api.get<IMovie[]>(getMoviehUrl('most-popular'))
	}
}

export default new MovieService()
