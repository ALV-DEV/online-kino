import axios from '../api/interceptors'
import { getUserhUrl } from '../config/api.config'

class AdminService {
	async getCountUser() {
		return axios.get<number>(getUserhUrl('/count'))
	}
}

export default new AdminService()
