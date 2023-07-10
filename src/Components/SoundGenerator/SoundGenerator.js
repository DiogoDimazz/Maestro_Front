import './styles.css'
import { useInterval } from '../../Hooks/useInterval';
import { useState, useEffect } from 'react';
import useConsumer from '../../Hooks/useConsumer';

export const SoundGenerator = () => {
    const {
        metronomeOn, bpmG, pulsesLine,
        resetAudioStructure, setResetAudioStructure
    } = useConsumer()
    const [audioCtx, setAudioCtxs] = useState();
    const [beatSources, setBeatSources] = useState([])
    const [beatBuffers, setBeatBuffers] = useState([]);
    const [iterator, setIterator] = useState()
    
    useEffect(() => {     
        if(!metronomeOn) return
        setAudioCtxs(new AudioContext())
        setIterator(0)
        return()=>{}
        //eslint-disable-next-line
    }, [bpmG, pulsesLine, metronomeOn, resetAudioStructure])


    useEffect(() => {
        if(!audioCtx) return
        loadBeats()
        createBuffers()
        return()=>{}
        //eslint-disable-next-line
    }, [audioCtx])
    

    useEffect(() => {
        if (metronomeOn) return
        for (let i = 0; i < beatSources.length; i++) {
            beatSources[i].loop = false
        }
    
        return()=>{}
        //eslint-disable-next-line
    }, [metronomeOn])


    const createBuffers = () => {
        const localSources = []
        for (let i = 0; i < pulsesLine.length; i++) {
            const localBufferSource = audioCtx.createBufferSource()
            localSources.push(localBufferSource)
        }
        setBeatSources(localSources)
    }


    const loadBeats = async () => {
        if(!pulsesLine) return
        let localBuffers = []
        for (const currentBeat of pulsesLine) {
            const response = await fetch(currentBeat)
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            localBuffers.push(audioBuffer)
        }
        setBeatBuffers(localBuffers)
    };
    

    const playTheSources = (currentBeat, currentBuffer) => {
        
        currentBeat.buffer = currentBuffer
        currentBeat.connect(audioCtx.destination)
        
        currentBeat.duration = 60/bpmG
        currentBeat.start()

        }
    

    useInterval(() => {
        playTheSources(beatSources[iterator], beatBuffers[iterator])

        if(iterator >= beatSources.length - 1) {
            setResetAudioStructure(!resetAudioStructure)
            return
        }

        setIterator(prev => prev + 1)


    }, metronomeOn ? 60000/bpmG :  null)
}