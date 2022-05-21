import { IsString, IsNumber, IsArray } from 'class-validator'

export class Parameters {
	@IsNumber()
	readonly year: number

	@IsNumber()
	readonly duration: number

	@IsString()
	readonly country: string
}

export class MovieDto {
	@IsString()
	readonly poster: string

	@IsString()
	readonly bigPoster: string

	@IsString()
	readonly title: string

	@IsString()
	readonly slug: string

	readonly parameters?: Parameters

	@IsString()
	readonly videoUrl: string

	@IsArray()
	@IsString({ each: true })
	readonly genres: string[]

	@IsArray()
	@IsString({ each: true })
	readonly actors: string[]

	readonly isSendTelegramm?: boolean

	readonly rating?: number

	readonly countOpened?: number
}
