import React, { useState } from 'react';

function AudioPlay() {
  const [audios, setAudios] = useState([]);
  const addFile = (e) => {
    if (e.target.files[0]) {
      const newAudio = URL.createObjectURL(e.target.files[0]);
      setAudios([...audios, newAudio]);
    }
  };
  return (
     <div>
      {audios.map((audio, index) => (
        <div key={index}>
          <audio controls src={audio} />
        </div>
      ))}
      <input type="file" onChange={addFile} />
    </div>
  
  );
}

export default AudioPlay;
