import { useEffect, useRef, useState } from 'react'
import './styles.css'
import Draggable from 'react-draggable'
import useConsumer from '../../Hooks/useConsumer'
import usePlayConsumer from '../../Hooks/usePlayConsumer'

export const BpmRuler = () => {
    const {
        bpmG, setBpmG
    } = useConsumer()
    const {
        metronomeOn, setMetronomeOn,
        resetAudioStructure, setResetAudioStructure
    } = usePlayConsumer()
    const [localMetronomeOn, setLocalMetronomeOn] = useState()
    const [rulerDivision, setRulerDivision] = useState(0)
    const rulerLineRef = useRef()
    
    
    const onTheDrag = (e, data) => {
        if (metronomeOn) {setLocalMetronomeOn(true)}
        setMetronomeOn(false)
        setBpmG(Number(((data.x/rulerDivision)+ 170).toFixed(0)));
    }
    
    const handleDrop = (e, data) => {
        const finalValue = Number(((data.x/rulerDivision)+ 170).toFixed(0))
        if (finalValue < 40) {setBpmG(40)}
        else if (finalValue > 300) {setBpmG(300)}
        else setBpmG(finalValue);
        setResetAudioStructure(!resetAudioStructure)
        
        if(localMetronomeOn) {setMetronomeOn(true)}
    }

    function getRulerSize () {
        setRulerDivision((rulerLineRef.current.offsetWidth / 270).toFixed(2));
    }

    useEffect(() => {
        getRulerSize()
        setLocalMetronomeOn(metronomeOn)
        return()=>{}
        //eslint-disable-next-line
    }, [])

    return (
        <main className='bpm-ruler-main'>
            <div className='ruler-line' ref={rulerLineRef}/>
            <Draggable
                axis='x'
                defaultPosition={{x:bpmG - 170, y:0}}
                bounds={'.bpm-ruler-main'}
                handle='.ruler-weight'
                grid={[rulerDivision, 1]}
                onDrag={onTheDrag}
                onStop={handleDrop}
                >
                <div className='ruler-weight'/>
            </Draggable>
        </main>
    )
}