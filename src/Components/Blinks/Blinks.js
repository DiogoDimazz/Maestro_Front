import { useRef, useEffect, useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './styles.css'

export const Blinks = () => {
    const {
        metronomeOn,
        timeSignG
    } = useConsumer()
    const blinkRefs = useRef([])
    blinkRefs.current = []
    const [local, setLocal] = useState([])

    const addToRefs = (e) => {
        if(e) {
            blinkRefs.current.push(e)
        }
    }

    const isLit = (blink) => {
        return blink ? {backgroundColor: 'green'} : {backgroundColor: 'red'}
    }
    
    useEffect(() => {
        setLocal(timeSignG.isBeat)
        return()=>{
            setLocal([])
        }
        //eslint-disable-next-line
    }, [metronomeOn])

    return (
        <section className='blink-section'>
            {local &&
            local.map((blink, index) => (
                <div className='bulb-rim' key={index} ref={addToRefs}>
                    <div className='blink-bulb' style={isLit(blink)}/>
                </div>
            ))}
        </section>
    )
}