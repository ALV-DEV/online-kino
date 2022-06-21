import instance from 'api/interceptors'

import { IRating } from '@/shared/types/movie.types'

import { getRatinghUrl } from '@/config/api.config'

class RatingService {
	async setRating(movieId: string, value: number) {
		return instance.post<IRating>(getRatinghUrl('/set-rating'), {
			movieId,
			value,
		})
	}

	async getByUserMovie(movieId: string) {
		return instance.get<{ _id: string; value: number }>(
			getRatinghUrl(`/${movieId}`)
		)
	}
}

export default new RatingService()
