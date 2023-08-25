import { useEffect, useState } from "react"
import useConsumer from "../../Hooks/useConsumer"
import { useInterval } from "../../Hooks/useInterval"
import usePlayConsumer from "../../Hooks/usePlayConsumer"
import {timeSignaturesData} from "../../Data/TimeSignatureData"

export const TheClock = () => {
    const {
        bpmG, isSubdivided
    } = useConsumer()
    
    const {
        metronomeOn,
        timeSignG, setTimeSignG,
        iterator, setIterator,
        audioCtx,
        beatBuffers, beatSources,
        resetAudioStructure, setResetAudioStructure
    } = usePlayConsumer()

    const [pulseSpeed, setPulseSpeed] = useState()

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

    useEffect(() => {
        isSubdivided ? setPulseSpeed(60000/(bpmG*3)) : setPulseSpeed(60000/bpmG)
    }, [isSubdivided, bpmG])

    useEffect(()=>{
        setTimeSignG({...timeSignaturesData[1]})
        //eslint-disable-next-line
    },[])

    useInterval(() => {
        playTheSources(beatSources[iterator], beatBuffers[iterator])
        turnTheLightsOn()
        if(iterator >= beatSources.length - 1) {
            setResetAudioStructure(!resetAudioStructure)
            return
        }
        setIterator(prev => prev + 1)

    }, metronomeOn ? pulseSpeed :  null)

}