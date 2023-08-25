import { useEffect, useRef, useState } from 'react'
import './styles.css'
import Draggable from 'react-draggable'
import useConsumer from '../../Hooks/useConsumer'
import usePlayConsumer from '../../Hooks/usePlayConsumer'

export const BpmRuler = () => {
    const {
        bpmG, setBpmG,
        inputBpm, setInputBpm
    } = useConsumer()
    const {
        resetAudioStructure, setResetAudioStructure
    } = usePlayConsumer()
    const [rulerDivision, setRulerDivision] = useState(0)
    const [handlePosition, setHandlePosition] = useState()
    const rulerLineRef = useRef()
    const draggableRef = useRef()
    
    
    const onTheDrag = (e, data) => {
        setHandlePosition(data.x)
        const value = Number(((data.x/rulerDivision)+170).toFixed(0))
        if (value > 300) {return setInputBpm(300)}
        if (value < 40) {return setInputBpm(40)}
        setInputBpm(value)
    }
    
    const handleDrop = (e, data) => {
        const finalValue = Number(((data.x/rulerDivision)+ 170).toFixed(0))
        if (finalValue < 40) {setBpmG(40)}
        else if (finalValue > 300) {setBpmG(300)}
        else setBpmG(finalValue);
        setResetAudioStructure(!resetAudioStructure)
    }
    
    function getRulerSize() {
        setRulerDivision(Number((0.35*rulerLineRef.current.offsetWidth/100).toFixed(0)));
    }
    
    function getHandlePosition() {
        setHandlePosition((inputBpm-170)*rulerDivision)
    }
    
    useEffect(() => {
        getHandlePosition()
        return()=>{}
        //eslint-disable-next-line
    }, [rulerDivision, inputBpm])
    
    useEffect(() => {
        window.addEventListener('resize', getRulerSize)
        getRulerSize()
        setInputBpm(bpmG)
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