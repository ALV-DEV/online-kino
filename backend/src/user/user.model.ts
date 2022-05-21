import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true, required: true })
	email: string
	@prop({ required: true })
	password: string
	@prop({ default: false })
	isAdmin?: boolean
	@prop({ default: [], ref: () => MovieModel })
	favorites?: Ref<MovieModel>[]
}
