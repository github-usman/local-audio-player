import React, { useEffect, useState } from 'react'

function AudioPlay() {
	const [audios, setAudios] = useState([])

	useEffect(() => {
		const storedAudios = JSON.parse(localStorage.getItem('storedAudios'))
		if (storedAudios) {
			setAudios(storedAudios)
		}
	}, [])

	useEffect(() => {
		const currentAudioInfo = JSON.parse(
			localStorage.getItem('playingAudioInfo'),
		)
		if (currentAudioInfo) {
			const audioElement =
				document.getElementsByTagName('audio')[currentAudioInfo[0]]

			if (audioElement) {
				audioElement.currentTime = currentAudioInfo[1]
			}
		}
	}, [audios])

	const handleTimeUpdate = (index) => (event) => {
		localStorage.setItem(
			'playingAudioInfo',
			JSON.stringify([index, event.target.currentTime]),
		)
	}

	// add audio
	const addFile = (e) => {
		if (e.target.files[0]) {
			const newAudio = URL.createObjectURL(e.target.files[0])
			setAudios([...audios, newAudio])

			localStorage.setItem(
				'storedAudios',
				JSON.stringify([...audios, newAudio]),
			)
		}
	}
	const handleAudioEnded = (index) => {
		const nextAudio = document.getElementsByTagName('audio')[index + 1]
		if (nextAudio) {
			nextAudio.play()
		} else {
			// All song will again start from frist song if it is available

			const loopAudio = document.getElementsByTagName('audio')[0]
			if (loopAudio) {
				loopAudio.play()
			}
		}
	}

	return (
		<div className="container">
			{audios.map((audio, index) => (
				<div key={index}>
				
						<div className="w-100 bg-dark p-3">
							<audio
								controls
								src={audio}
								onEnded={() => handleAudioEnded(index)}
								onTimeUpdate={handleTimeUpdate(index)}
							/>
						</div>
					
				</div>
			))}
			<input type="file" onChange={addFile} />
			<h3 className='mt-5'>Currently Working on Design Part All funtionality is working fine</h3>
		</div>
	)
}

export default AudioPlay
