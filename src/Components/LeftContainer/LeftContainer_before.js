
// import { useRef, useState, useEffect } from 'react';
// import { useInterval } from '../../Hooks/useInterval';
// import './styles.css';
// import metronomo from '../../assets/Metronomo_2.png';
// import pendulum from '../../assets/haste.png';
// import weightPiece from '../../assets/peso.png';

// export const LeftContainer = () => {
//   const [metronomeOn, setMetronomeOn] = useState(false);
//   const timeSignature = ['strong', 'weak', 'weak', 'weak'];
//   const [beatNumber, setBeatNumber] = useState(0);
//   const [audioBuffer, setAudioBuffer] = useState()
//   const bpm = 120;

//   const loadAudio = async () => {
//     try {
//       const audioContext = new AudioContext();
//       const response = await fetch("./Short_Bip.mp3");
//       const arrayBuffer = await response.arrayBuffer();
//       const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);
//       setAudioBuffer(decodedAudio);
//     } catch (error) {
//       console.error('Error loading audio:', error);
//     }
//   }

//   const playback = () => {
//     if (!audioBuffer) return;

//     const audioContext = new AudioContext();
//     const source = audioContext.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(audioContext.destination);
//     source.start(0);
//   };


//   const onAndOff = () => {
//     if(metronomeOn) { playback()}
//     setMetronomeOn((prev) => !prev);
//   };

//   useEffect(() => {
//     loadAudio()
//     return()=>{}
//   }, [])

//   return (
//     <section className="left-container">
//       <div className="metronome-montage">
//         <img src={metronomo} alt="metronomo" className="metronome-img" />
//         <img src={pendulum} alt="pendulum" className="pendulum-img" />
//         <img src={weightPiece} alt="weight" className="weight-img" />
//       </div>
//       <div className="controls">
//         <button className="on-off-btn" onClick={onAndOff}>
//           Power
//         </button>
//         <div>Bpm indicator</div>
//       </div>
//     </section>
//   );
// };
