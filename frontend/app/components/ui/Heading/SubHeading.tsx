import { FC } from 'react'

const SubHeading: FC<{ title: string }> = ({ title }) => {
	return <h2 className={`text-white font-semibold text-xl mb-5`}>{title}</h2>
}

export default SubHeading
