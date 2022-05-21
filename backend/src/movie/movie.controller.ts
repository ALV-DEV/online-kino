import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { MovieDto } from './dto/movie.dto'
import { MovieService } from './movie.service'
import { Types } from 'mongoose'

@Controller('movie')
export class MovieController {
	constructor(private readonly MovieService: MovieService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.MovieService.bySlug(slug)
	}

	@Post('by-genres')
	@HttpCode(200)
	async byGenres(@Body('genres') genres: string[]) {
		return this.MovieService.byGenres(genres)
	}
	@Get('by-actor/:actorId')
	async byActor(@Param('actorId') actorId: string) {
		return this.MovieService.byActor(actorId)
	}

	@Put('update-count-opened/:slug')
	async updateCountOpened(@Param('slug') slug: string) {
		return this.MovieService.updateCountOpened(slug)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.MovieService.getMostPopular()
	}

	@Get('/:id')
	@Auth('admin')
	async byId(@Param('id') _id: string) {
		return this.MovieService.byId(_id)
	}

	@Post()
	@Auth('admin')
	async create() {
		return this.MovieService.create()
	}

	@Put('/:id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.MovieService.update(id, dto)
	}

	@Delete('/:id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		return this.MovieService.delete(id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.MovieService.getAll(searchTerm)
	}
}
