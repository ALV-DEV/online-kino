import styles from '../Movie.module.scss'

const NotAuthFavorite = () => {
	return (
		<div className="mt-11 bg-gray-700 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80">
			Для просмотра избранных нужно авторизоваться
		</div>
	)
}

export default NotAuthFavorite
