import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import styles from './Form.module.scss'
import { IButton } from './form.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
