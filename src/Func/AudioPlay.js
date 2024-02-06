import React, { useEffect, useState } from 'react'

function AudioPlay() {
	const [audios, setAudios] = useState([])
	const [ind, setInd] = useState(null)

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
		if(currentAudioInfo){

			const audioElement = document.getElementsByTagName('audio')[currentAudioInfo[0]];
			console.log(currentAudioInfo[1],'vaoues');
			if(audioElement){
				console.log('value',currentAudioInfo[1])
				audioElement.currentTime = currentAudioInfo[1];
				// setInd(currentAudioInfo[0]);
			}
		}
	}, [audios])

	const handleTimeUpdate = (index) => (event) => {
		console.log(event.target.currentTime, ' index  ->', index)
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
			console.log(audios.length, ' = length')
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
	const handlPlay = (index) => {
		setInd(index);
		console.log("here index", index);
	  }
	  
	  useEffect(() => {
		if (ind !== null) {
		  const audioElement = document.getElementsByTagName('audio')[ind];
		  const currentAudioInfo = JSON.parse(
			localStorage.getItem('playingAudioInfo'),
		)
		  if(currentAudioInfo){

			  audioElement.currentTime = currentAudioInfo[1];
		  }
		  audioElement.play();
		}
	  }, [ind]);
	  

	return (
		<div className='container'>
			{audios.map((audio, index) => (
				<div key={index} >
					{

						ind === index ?
						<div className='w-100 bg-success '>
						<audio
						controls
						src={audio}
						onEnded={() => handleAudioEnded(index)}
						onTimeUpdate={handleTimeUpdate(index)}
						onPlay={() => handlPlay(index)} 
					   />
					</div>
					:
					<audio
						controls
						src={audio}
						onEnded={() => handleAudioEnded(index)}
						onTimeUpdate={handleTimeUpdate(index)}
						onPlay={() => handlPlay(index)} 
					/>
					}
					
				</div>
			))}
			<input type="file" onChange={addFile} />
		</div>
	)
}

export default AudioPlay
