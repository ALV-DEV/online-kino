import { errorCath } from 'api/api.helpers'
import { toastr } from 'react-redux-toastr'

export const errosRequest = (error: any, title?: string) => {
	const message = errorCath(error)
	toastr.error(title || 'Ошибка сервера', message)
	throw message
}
