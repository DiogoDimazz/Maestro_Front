import './styles.css'
import { useInterval } from '../../Hooks/useInterval';
import { useState, useEffect } from 'react';
import useConsumer from '../../Hooks/useConsumer';
import strongBeepURL from '../../assets/long-strong-beat.mp3'
import weakBeepURL from '../../assets/long-weak-beat.mp3'

export const SoundGenerator = () => {
    const {
        metronomeOn, bpmG,
        timeSignG, setTimeSignG,
        resetAudioStructure, setResetAudioStructure
    } = useConsumer()
    const [audioCtx, setAudioCtxs] = useState();
    const [beatSources, setBeatSources] = useState([])
    const [beatBuffers, setBeatBuffers] = useState([]);
    const [iterator, setIterator] = useState()
    const [generatorBeatsArray, setGeneratorBeatsArray] = useState([])
    
    useEffect(() => {     
        if(!metronomeOn) return
        setAudioCtxs(new AudioContext())
        setIterator(0)
        setGeneratorBeatsArray(timeSignG.beats)
        return()=>{}
        //eslint-disable-next-line
    }, [bpmG, metronomeOn, resetAudioStructure])


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
        for (let i = 0; i < generatorBeatsArray.length; i++) {
            const localBufferSource = audioCtx.createBufferSource()
            localSources.push(localBufferSource)
        }
        setBeatSources(localSources)
    }


    const loadBeats = async () => {
        if(!generatorBeatsArray) return
        let localBuffers = []
        for (const currentBeat of generatorBeatsArray) {
            const response = await fetch(currentBeat === 'strong' ? strongBeepURL : weakBeepURL)
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


    const turnTheLightsOn = () => {
        const controlArray = timeSignG.isBeat
        controlArray[iterator] = true
        if(iterator === 0) {
            controlArray[controlArray.length-1] = false
        } else {
            controlArray[iterator-1] = false
        }
        setTimeSignG({...timeSignG, isBeat: controlArray})
    }


    useInterval(() => {
        playTheSources(beatSources[iterator], beatBuffers[iterator])
        turnTheLightsOn()
        if(iterator >= beatSources.length - 1) {
            setResetAudioStructure(!resetAudioStructure)
            return
        }

        setIterator(prev => prev + 1)


    }, metronomeOn ? 60000/bpmG :  null)
}