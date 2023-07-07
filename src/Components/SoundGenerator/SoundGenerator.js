import './styles.css'
import { useInterval } from '../../Hooks/useInterval';
import { useState, useEffect } from 'react';
import useConsumer from '../../Hooks/useConsumer';



export const SoundGenerator = () => {
    const {metronomeOn, bpmG, timeSignatureG} = useConsumer()
    const audioCtx = new AudioContext();
    const [beatSources, setBeatSources] = useState([])
    const [beepBuffer, setBeepBuffer] = useState(null);
    const [playBeats, setPlayBeats] = useState()
    
    
    const createBuffers = () => {
        const localSources = []

        for (let i = 0; i < timeSignatureG.length; i++) {
            const localBuffer = audioCtx.createBufferSource()
            localSources.push(localBuffer)
        }

        setBeatSources(localSources)
    }

    const loadBeep = async () => {
        if(!timeSignatureG) return

        const localBeatArray = []
        timeSignatureG.forEach(async (currentBeep) => {
            const response = await fetch(currentBeep);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            localBeatArray.push(audioBuffer)
            console.log(audioBuffer.numberOfChannels);
        })
        setBeepBuffer(localBeatArray);
        //o bloco abaixo é um teste. Preciso fazer audios longos os suficiente para 40 bpm
        //E com isso determinar a duração pelo loopEnd

        // const response = await fetch(beeps) 
        // const arrayBuffer = await response.arrayBuffer()
        // const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
        // setBeepBuffer(audioBuffer)
    };
    
    const fillTheSources = () => {
        for(let i = 0; i < timeSignatureG.length; i++) {
            beatSources[i].buffer = beepBuffer[i]
            beatSources[i].connect(audioCtx.destination)
            beatSources[i].loop = true
            beatSources[i].loopEnd = 60/bpmG
            setPlayBeats(true)
        }
    }

    const stopMetronome = () => {
        for (let i = 0; i < beatSources.length; i++){
            beatSources[i].stop()
        }
    }
    
    useEffect(() => {
        if(beatSources.length === 0) return

        loadBeep();
        return()=>{}

        //eslint-disable-next-line
    }, [beatSources])
    
    useEffect(() => {
        createBuffers()
        return()=>{}

        //eslint-disable-next-line
    }, [bpmG])


    useEffect(() => {
        if(!metronomeOn) return

        setPlayBeats(true)
        if (beepBuffer) {
            fillTheSources()
            // beepSource.buffer = beepBuffer;
            // beepSource.connect(audioCtx.destination)
            // beepSource.loop = true
            // beepSource.loopEnd = 60/bpmG
            // beepSource.loopStart = timeSignatureG[beatSelector]
            // beepSource.start();
        }
        
        return()=>{
            stopMetronome()
        }
        //eslint-disable-next-line
    }, [metronomeOn])
    
    useInterval(() => {
        console.log('aqui');
        if(!beepBuffer) return
        let i = 0

        beatSources[i].start()
        if(i >= beatSources.length) {return setPlayBeats(false)}
        i++;

    }, playBeats ? 60000/bpmG :  null)
}