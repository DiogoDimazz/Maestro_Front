import { useEffect, useRef } from 'react'
import './styles.css'
import Draggable from 'react-draggable'
import useConsumer from '../../Hooks/useConsumer'

export const BpmRuler = () => {
    const {setBpmG, metronomeOn, setMetronomeOn} = useConsumer()
    const onTheDrag = (e, data) => {
        setMetronomeOn(false)
        setBpmG(Number(((data.x/5)+ 170).toFixed(0)));
    }

    useEffect(() => {
        return()=>{}
    }, [metronomeOn])

    return (
        <main className='bpm-ruler-main'>
            <div className='ruler-line'/>
            <Draggable
                axis='x'
                defaultPosition={{x:-250, y:0}}
                bounds={'.bpm-ruler-main'}
                handle='.ruler-weight'
                grid={[5, 1]}
                onDrag={onTheDrag}
                >
                <div className='ruler-weight'/>
            </Draggable>
        </main>
    )
}