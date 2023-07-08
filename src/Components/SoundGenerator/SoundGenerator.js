import './styles.css'
import { useInterval } from '../../Hooks/useInterval';
import { useState, useEffect } from 'react';
import useConsumer from '../../Hooks/useConsumer';

export const SoundGenerator = () => {
    const {metronomeOn, bpmG, timeSignatureG} = useConsumer()
    const [audioCtx, setAudioCtxs] = useState();
    const [beatSources, setBeatSources] = useState([])
    const [beatBuffers, setBeatBuffers] = useState([]);
    const [iterator, setIterator] = useState()
    const [playBeats, setPlayBeats] = useState(false)
    
    useEffect(() => {     
        if(!metronomeOn) return
        setAudioCtxs(new AudioContext())
        setIterator(0)
        return()=>{setPlayBeats(false)}
        //eslint-disable-next-line
    }, [bpmG, timeSignatureG, metronomeOn])


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
        for (let i = 0; i < timeSignatureG.length; i++) {
            const localBufferSource = audioCtx.createBufferSource()
            localSources.push(localBufferSource)
        }
        setBeatSources(localSources)
    }


    const loadBeats = async () => {
        if(!timeSignatureG) return
        let localBuffers = []
        for (const currentBeat of timeSignatureG) {
            const response = await fetch(currentBeat)
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            localBuffers.push(audioBuffer)
        }
        setBeatBuffers(localBuffers)
    };
    
    useEffect(() => {
        if (beatSources.length === 0) return
        if(metronomeOn) {
            setPlayBeats(true)
        }
        return()=>{}

    }, [beatSources])

    const playTheSources = (currentBeat, currentBuffer) => {
        if (iterator === 2 || iterator === 3) {console.log('agora')}
        currentBeat.buffer = currentBuffer
        currentBeat.connect(audioCtx.destination)
        
        currentBeat.loop = true
        currentBeat.loopEnd = 60/bpmG * timeSignatureG.length
        currentBeat.start()

        }
    

    useInterval(() => {
        // if(beatSources.length === 0 || localBuffers.length === 0) return

        playTheSources(beatSources[iterator], beatBuffers[iterator])

        if(iterator >= beatSources.length - 1) {
            setPlayBeats(false)
            return
        }

        setIterator(prev => prev + 1)


    }, playBeats ? 60000/bpmG :  null)
}