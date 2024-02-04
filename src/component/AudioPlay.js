import React, { useRef, useState } from 'react';

function AudioPlay() {
  const [audios, setAudios] = useState([]);
  const currentTimeRef = useRef(0);

  const handleTimeUpdate = (event) => {
    currentTimeRef.current = event.target.currentTime;
    console.log(currentTimeRef.current,'value');
    // You can perform any manipulation with the current time here
    // For example, console.log(currentTimeRef.current);
  };

  // add audio
  const addFile = (e) => {
    if (e.target.files[0]) {
      const newAudio = URL.createObjectURL(e.target.files[0]);
      setAudios([...audios, newAudio]);
      console.log(audios.length,' = length');
    }
  }
  const handleAudioEnded = (index) => {
    const nextAudio = document.getElementsByTagName('audio')[index+1];
    if (nextAudio) {
      console.log(nextAudio.duration);
      nextAudio.play();
    }else{
      // All song will again start from frist song if it is available
      
      const loopAudio = document.getElementsByTagName('audio')[0];
      if (loopAudio) {
        loopAudio.play();
      }
    }
  };
  

  return (
     <div>
      {audios.map((audio, index) => (
        <div key={index}>
          <audio controls src={audio} onEnded={()=>handleAudioEnded(index)} onTimeUpdate={handleTimeUpdate} />
        </div>
      ))}
      <input type="file" onChange={addFile} />
    </div>
  
  );
}

export default AudioPlay;
