import { IGenre } from '@/shared/types/movie.types'

export interface IGerneEdit extends Omit<IGenre, '_id'> {}
