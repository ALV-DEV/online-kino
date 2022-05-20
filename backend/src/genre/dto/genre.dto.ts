import { IsString } from 'class-validator'

export class GenreDto {
	@IsString()
	readonly name: string
	@IsString()
	readonly slug: string
	@IsString()
	readonly description: string
	@IsString()
	readonly icon: string
}
