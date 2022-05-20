import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GenreDto } from './dto/genre.dto'
import { GenreService } from './genre.service'

@Controller('genre')
export class GenreController {
	constructor(private readonly GenreService: GenreService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.GenreService.bySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@Put('/:id')
	@Auth('admin')
	async update(@Param('id') _id: string, @Body() dto: GenreDto) {
		return this.GenreService.update(_id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@Auth('admin')
	async create() {
		return this.GenreService.create()
	}

	@Delete('/:id')
	@Auth('admin')
	async delete(@Param('id') _id: string) {
		return this.GenreService.delete(_id)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.GenreService.getAll(searchTerm)
	}

	@Get('collections')
	async getCollections() {
		return this.GenreService.getCollection()
	}
	@Get('/:id')
	@Auth('admin')
	async byId(@Param('id') _id: string) {
		return this.GenreService.byId(_id)
	}
}
