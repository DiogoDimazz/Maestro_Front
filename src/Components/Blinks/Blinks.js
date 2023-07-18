import { useRef, useEffect, useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './styles.css'

export const Blinks = () => {
    const {
        metronomeOn,
        timeSignG, setTimeSignG,
        bpmG
    } = useConsumer()
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
    }, [localTimeSign, bpmG])

    useEffect(() => {
        setLocalTimeSign({...timeSignG})
        return()=>{}
        //eslint-disable-next-line
    }, [metronomeOn])

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