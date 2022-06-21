import cn from 'classnames'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import MaterialIcon from '../MaterialIcon'

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import styles from './VideoPlayer.module.scss'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.interface'

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSrc }) => {
	const { actions, video, videoRef } = useVideo()
	const { user } = useAuth()

	return (
		<div className={cn(styles.palyer, { 'h-96': !user })}>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.palyer__video}
						src={`${videoSrc}#t=8`}
						preload="metadata"
					/>
					<div className={styles['palyer__progressbar-container']}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.palyer__progressbar}
						></div>
					</div>

					<div className={styles.palyer__controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>

							<button
								onClick={actions.toggleVideo}
								className={styles.playbtn}
							>
								<MaterialIcon
									name={
										video.isPlaying
											? 'MdPause'
											: 'MdPlayArrow'
									}
								/>
							</button>

							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>

							<div className={styles.palyer__time}>
								<p>
									{Math.floor(video.currentTime / 60) +
										':' +
										(
											'0' +
											Math.floor(video.currentTime % 60)
										).slice(-2)}
								</p>
								<p> / </p>
								<p>
									{Math.floor(video.videoTime / 60) +
										':' +
										(
											'0' +
											Math.floor(video.videoTime % 60)
										).slice(-2)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

export default VideoPlayer
