import './styles.css'
import { useState, useEffect } from 'react';
import strongBeepURL from '../../assets/long-strong-beat.mp3'
import weakBeepURL from '../../assets/long-weak-beat.mp3'
import usePlayConsumer from '../../Hooks/usePlayConsumer';

export const SoundGenerator = () => {
    const {
        metronomeOn,
        timeSignG,
        resetAudioStructure,
        beatSources, setBeatSources,
        setBeatBuffers,
        setIterator,
        audioCtx, setAudioCtxs,
        setVolumeNode
    } = usePlayConsumer()
    
    const [generatorBeatsArray, setGeneratorBeatsArray] = useState([])
    useEffect(() => {
        if(!metronomeOn) return
        setAudioCtxs(new AudioContext())
        setIterator(0)
        setGeneratorBeatsArray(timeSignG.beats)

        return()=>{}
        //eslint-disable-next-line
    }, [ metronomeOn, resetAudioStructure])


    useEffect(() => {
        if(!audioCtx) return
        loadBeats()
        createBuffers()
        createVolumeNode()
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

    const createVolumeNode = () =>{
        setVolumeNode(audioCtx.createGain())
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
}