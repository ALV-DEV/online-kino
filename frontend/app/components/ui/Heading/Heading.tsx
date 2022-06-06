import React, { FC } from 'react'

const Heading: FC<{ title: string; className?: string }> = ({
	title,
	className,
}) => {
	return (
		<h1
			className={`text-white text-opacity-80 font-semibold text-2xl ${className}`}
		>
			{title}
		</h1>
	)
}

export default Heading
