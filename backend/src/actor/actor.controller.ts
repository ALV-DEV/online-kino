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
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'

@Controller('actor')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@Auth('admin')
	async create() {
		return this.actorService.create()
	}

	@Put('/:id')
	@UsePipes(new ValidationPipe())
	@Auth('admin')
	async update(@Param('id') _id: string, @Body() dto: ActorDto) {
		return this.actorService.update(_id, dto)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm)
	}

	@Get('/:id')
	@Auth('admin')
	async byId(@Param('id') _id: string) {
		return this.actorService.byId(_id)
	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug)
	}

	@Delete('/:id')
	@Auth('admin')
	async delete(@Param('id') _id: string) {
		return this.actorService.delete(_id)
	}
}
