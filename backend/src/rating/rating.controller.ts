import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { RatingDto } from './dto/rating.dto'
import { RatingService } from './rating.service'

@Controller('rating')
export class RatingController {
	constructor(private readonly RatingService: RatingService) {}

	@Get('/:movieId')
	@Auth()
	async getMovieValue(
		@Param('movieId') movieId: string,
		@User('_id') _id: string,
	) {
		return this.RatingService.getMovieValueByUser(movieId, _id)
	}

	@UsePipes(new ValidationPipe())
	@Post('set-rating')
	@Auth()
	async setRating(@User('_id') _id: string, @Body() dto: RatingDto) {
		return this.RatingService.setRating(_id, dto)
	}
}
