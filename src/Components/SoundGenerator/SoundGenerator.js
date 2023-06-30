import './styles.css'
import { useInterval } from '../../Hooks/useInterval';
import { useState, useEffect } from 'react';
import useConsumer from '../../Hooks/useConsumer';
import strongBeepURL from '../../assets/strong-beat.mp3'
import weakBeepURL from '../../assets/weak-beat.mp3'

export const SoundGenerator = () => {
    const {metronomeOn} = useConsumer()
    const audioCtx = new AudioContext();
    const [beepBuffer, setBeepBuffer] = useState(null);
    const timeSignature = [strongBeepURL, weakBeepURL, weakBeepURL]
    const [beatCounter, setBeatCounter] = useState(0)


    const loadBeep = () => {
        const localBeatArray = []
        timeSignature.forEach(async (currentBeep) => {
            const response = await fetch(currentBeep);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            localBeatArray.push(audioBuffer)
        })
        setBeepBuffer(localBeatArray);
    };

    useEffect(() => {
        loadBeep();
        return(() => {})
    }, []);


    useInterval(() => {
        if (beepBuffer) {
            const beepSource = audioCtx.createBufferSource();
            beepSource.buffer = beepBuffer[beatCounter];
            beepSource.connect(audioCtx.destination);
            beepSource.start();
        }
        console.log(beepBuffer.length);
        if (beatCounter === beepBuffer.length - 1) {return setBeatCounter(0)}
        setBeatCounter(prev => prev + 1)
    }, metronomeOn ? 500 :  null)
}