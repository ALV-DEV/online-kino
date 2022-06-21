import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { IVideoElement } from './video.interface'

export const useVideo = () => {
	const videoRef = useRef<IVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (videoRef.current?.duration) {
			setVideoTime(videoRef.current?.duration)
		}
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const forward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10
		}
	}

	const revert = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10
		}
	}

	const fullScreen = () => {
		const video = videoRef.current

		if (video) {
			if (video.requestFullscreen) {
				video.requestFullscreen()
			} else if (video.msRequestFullscreen) {
				video.msRequestFullscreen()
			} else if (video.mozRequestFullScreen) {
				video.mozRequestFullScreen()
			} else if (video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen()
			}
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (video) {
			const upadateProgress = () => {
				setCurrentTime(video.currentTime)
				setProgress((video.currentTime / currentTime) * 100)
			}

			video.addEventListener('timeupdate', upadateProgress)

			return () => {
				video.removeEventListener('timeupdate', upadateProgress)
			}
		}
	}, [videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					forward()
					break
				case 'ArrowLeft':
					revert()
					break
				case ' ': {
					e.preventDefault()
					toggleVideo()
					break
				}
				case 'f':
					fullScreen()
					break
				default:
					return
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	return useMemo(() => {
		return {
			videoRef,
			actions: {
				toggleVideo,
				forward,
				revert,
				fullScreen,
			},
			video: {
				isPlaying,
				currentTime,
				videoTime,
				progress,
			},
		}
	}, [isPlaying, currentTime, videoTime, progress, toggleVideo])
}
