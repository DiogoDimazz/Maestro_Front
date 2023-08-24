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
    const [handlePosition, setHandlePosition] = useState()
    const rulerLineRef = useRef()
    const draggableRef = useRef()
    
    
    const onTheDrag = (e, data) => {
        if (metronomeOn) {setLocalMetronomeOn(true)}
        setMetronomeOn(false)
        setHandlePosition(data.x)
        const value = Number(((data.x/rulerDivision)+170).toFixed(0))
        if (value > 300) {return setBpmG(300)}
        if (value < 40) {return setBpmG(40)}
        setBpmG(value)
    }
    
    const handleDrop = (e, data) => {
        const finalValue = Number(((data.x/rulerDivision)+ 170).toFixed(0))
        if (finalValue < 40) {setBpmG(40)}
        else if (finalValue > 300) {setBpmG(300)}
        else setBpmG(finalValue);
        setResetAudioStructure(!resetAudioStructure)
        
        if(localMetronomeOn) {setMetronomeOn(true)}
    }
    
    function getRulerSize() {
        setRulerDivision(Number((0.35*rulerLineRef.current.offsetWidth/100).toFixed(0)));
    }
    
    function getHandlePosition() {
        setHandlePosition((bpmG-170)*rulerDivision)
    }

    useEffect(() => {
        getHandlePosition()
        return()=>{}
        //eslint-disable-next-line
    }, [rulerDivision, bpmG])

    useEffect(() => {
        window.addEventListener('resize', getRulerSize)
        getRulerSize()
        setLocalMetronomeOn(metronomeOn)
        return()=>{
            window.removeEventListener('resize', getRulerSize)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <main className='bpm-ruler-main'>
            <div className='ruler-line' ref={rulerLineRef}/>
            <Draggable
                axis='x'
                bounds={'.ruler-line'}
                handle='.ruler-weight'
                grid={[rulerDivision, 0]}
                onDrag={onTheDrag}
                onStop={handleDrop}
                position={{x: handlePosition, y: 0}}
                ref={draggableRef}
                >
                <div className='ruler-weight'/>
            </Draggable>
        </main>
    )
}