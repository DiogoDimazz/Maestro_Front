import './styles.css'
import { useInterval } from '../../Hooks/useInterval';
import { useState, useEffect } from 'react';
import useConsumer from '../../Hooks/useConsumer';


export const SoundGenerator = () => {
    const {metronomeOn, bpmG, timeSignatureG} = useConsumer()
    const audioCtx = new AudioContext();
    const [beepBuffer, setBeepBuffer] = useState(null);
    const [beatCounter, setBeatCounter] = useState(0)
    
    const loadBeep = () => {
        console.log('loadBeep');
        if(!timeSignatureG) return
        const localBeatArray = []
        timeSignatureG.forEach(async (currentBeep) => {
            const response = await fetch(currentBeep);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            localBeatArray.push(audioBuffer)
        })
        setBeepBuffer(localBeatArray);
    };
    
    
    
    
    useEffect(() => {
        console.log('load');
        loadBeep();
        return()=>{}
    }, [])

    useEffect(() => {
        if (beepBuffer) {
            const beepSource = audioCtx.createBufferSource();
            beepSource.buffer = beepBuffer[beatCounter];
            beepSource.connect(audioCtx.destination)
            beepSource.loop = true
            beepSource.start();
        }

        return()=>{}
        //eslint-disable-next-line
    }, [metronomeOn])

    useInterval(() => {
        // console.log('interval');
        // if (beepBuffer) {
        //     const beepSource = audioCtx.createBufferSource();
        //     beepSource.buffer = beepBuffer[beatCounter];
        //     beepSource.connect(audioCtx.destination);
        //     beepSource.loop = true
        //     beepSource.start();
        //     setTimeout(() => {
        //         beepSource.stop()
        //     }, 500)
        // }

        if (beatCounter === beepBuffer.length - 1) {return setBeatCounter(0)}
        setBeatCounter(prev => prev + 1)
    }, metronomeOn ? 1000 :  null)
}