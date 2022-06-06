import { TypeIconName } from './icon.types'

export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: TypeIconName
}

export interface IActor {
	_id: string
	name: string
	slug: string
	photo: string
	countMovies: number
}

export interface IParameters {
	year: number
	duration: number
	country: string
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	slug: string
	videoUrl: string
	genres: IGenre[]
	actors: IActor[]
	rating: number
	countOpened: number
	parameters: IParameters
}
