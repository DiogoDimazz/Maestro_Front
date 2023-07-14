import { useEffect, useState } from 'react'
import './styles.css'
import Draggable from 'react-draggable'
import useConsumer from '../../Hooks/useConsumer'

export const BpmRuler = () => {
    const {
        bpmG, setBpmG,
        metronomeOn, setMetronomeOn,
        resetAudioStructure, setResetAudioStructure
    } = useConsumer()
    const [localMetronomeOn, setLocalMetronomeOn] = useState()

    const onTheDrag = (e, data) => {
        if (metronomeOn) {setLocalMetronomeOn(true)}
        setMetronomeOn(false)
        console.log(data.x);
        setBpmG(Number(((data.x/5)+ 170).toFixed(0)));
    }
    
    const handleDrop = (e, data) => {
        setBpmG(Number(((data.x/5)+ 170).toFixed(0)));
        setResetAudioStructure(!resetAudioStructure)
        
        if(localMetronomeOn) {setMetronomeOn(true)}
    }

    useEffect(() => {
        setLocalMetronomeOn(metronomeOn)
        return()=>{}
        //eslint-disable-next-line
    }, [])

    return (
        <main className='bpm-ruler-main'>
            <div className='ruler-line'/>
            <Draggable
                axis='x'
                defaultPosition={{x:(bpmG - 170)*5, y:0}}
                bounds={'.bpm-ruler-main'}
                handle='.ruler-weight'
                grid={[5, 1]}
                onDrag={onTheDrag}
                onStop={handleDrop}
                >
                <div className='ruler-weight'/>
            </Draggable>
        </main>
    )
}