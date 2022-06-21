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

	async create() {
		return instence.post<string>(getMoviehUrl())
	}

	async getById(id: string) {
		return instence.get<IMovie>(getMoviehUrl(`/${id}`))
	}

	async getBySlug(slug: string) {
		return $api.get<IMovie>(getMoviehUrl(`/by-slug/${slug}`))
	}

	async getByGenres(genres: string[]) {
		return $api.post<IMovie[]>(getMoviehUrl(`/by-genres`), { genres })
	}

	async getByActor(actorId: string) {
		return $api.get<IMovie[]>(getMoviehUrl(`/by-actor/${actorId}`))
	}

	async deleteMovie(id: string) {
		return instence.delete<IMovie>(getMoviehUrl(`/${id}`))
	}

	async getMostPopularMovies() {
		return $api.get<IMovie[]>(getMoviehUrl('most-popular'))
	}

	async update(id: string, data: IMovie) {
		return instence.put<IMovie>(getMoviehUrl(`/${id}`), data)
	}

	async updateCountOpened(slug: string) {
		return $api.put<IMovie>(getMoviehUrl(`update-count-opened/${slug}`))
	}
}

export default new MovieService()
