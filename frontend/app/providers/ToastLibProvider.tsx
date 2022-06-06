import { FC } from 'react'
import ReduxTostrLib from 'react-redux-toastr'

const ToastLibProvider: FC = () => {
	return (
		<ReduxTostrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn="fadeIn"
			transitionOut="fadeOut"
		/>
	)
}

export default ToastLibProvider
