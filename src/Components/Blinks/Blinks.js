import { useRef, useEffect, useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './styles.css'
import usePlayConsumer from '../../Hooks/usePlayConsumer'

export const Blinks = () => {

    const { bpmG, timeSelection } = useConsumer()
    
    const {
        metronomeOn,
        timeSignG, setTimeSignG
    } = usePlayConsumer()

    const blinkRefs = useRef([])
    blinkRefs.current = []
    const [localTimeSign, setLocalTimeSign] = useState()
    
    const addToRefs = (e) => {
        if(e) {
            blinkRefs.current.push(e)
        }
    }

    const turnOfftheLights = () => {
        const local = timeSignG.isBeat
        local.fill(false)
        setTimeSignG({...timeSignG, isBeat: local})
    }
    
    const isLit = (blink) => {
        return blink ? {backgroundColor: 'green'} : {backgroundColor: 'red'}
    }
    
    useEffect(()=> {
        turnOfftheLights()
        return()=>{}
        //eslint-disable-next-line
    }, [localTimeSign, bpmG])

    useEffect(() => {
        if(timeSelection) {
            setLocalTimeSign({...timeSelection})
            setTimeSignG({...timeSelection})
        }
        return()=>{}
        //eslint-disable-next-line
    }, [metronomeOn, timeSelection])

    return (
        <section className='blink-section'>
            {localTimeSign &&
            localTimeSign.isBeat.map((blink, index) => (
                <div className='bulb-rim' key={index} ref={addToRefs}>
                    <div className='blink-bulb' style={isLit(blink)}/>
                </div>
            ))}
        </section>
    )
}