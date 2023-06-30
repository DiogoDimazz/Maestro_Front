import React, { useEffect, useState } from 'react';

export const LeftContainer = () => {
  const [audioBuffer, setAudioBuffer] = useState(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const audioContext = new AudioContext();
        const response = await fetch('../../assets/song.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedAudio);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();
  }, []);

  const playback = () => {
    if (!audioBuffer) return;

    const audioContext = new AudioContext();
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  };

  return (
    <>
      <h1>Teste</h1>
      <button onClick={playback}>Bip</button>
    </>
  );
};
