import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { allActions } from '@/store/rootActions'

export const useActions = () => {
	const dispath = useDispatch()

	return useMemo(() => {
		return bindActionCreators(allActions, dispath)
	}, [dispath])
}
