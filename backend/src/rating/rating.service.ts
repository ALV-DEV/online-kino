import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { MovieService } from 'src/movie/movie.service'
import { RatingDto } from './dto/rating.dto'
import { RatingModel } from './rating.model'

@Injectable()
export class RatingService {
	constructor(
		@InjectModel(RatingModel)
		private readonly RatingModel: ModelType<RatingModel>,
		private readonly MovieService: MovieService,
	) {}

	async getMovieValueByUser(movieId: string, userId: string) {
		return this.RatingModel.findOne({ movie: movieId, user: userId })
			.select('value')
			.exec()
			.then((data) => (data ? data : 0))
	}

	async averageRating(movieId: string) {
		const ratings = await this.RatingModel.find({ movie: movieId }).exec()

		return (
			ratings.reduce((acc, item) => acc + item.value, 0) / ratings.length
		)
	}

	async setRating(userId: string, dto: RatingDto) {
		const newRating = await this.RatingModel.findOneAndUpdate(
			{ user: userId, movie: dto.movieId },
			{
				movie: dto.movieId,
				user: userId,
				value: dto.value,
			},
			{
				new: true,
				upsert: true,
				setDefaultsOnInsert: true,
			},
		).exec()

		const averageRating = await this.averageRating(dto.movieId)
		await this.MovieService.updateRating(dto.movieId, averageRating)

		return newRating
	}
}
