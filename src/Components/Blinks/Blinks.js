import { useRef, useEffect, useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'
import './styles.css'

export const Blinks = () => {
    const {timeSignG} = useConsumer()
    const blinkRefs = useRef([])
    blinkRefs.current = []
    const [blinksBeatsArray, setBlinksBeatsArray] = useState([])

    const addToRefs = (e) => {
        if(e) {
            blinkRefs.current.push(e)
        }
    }

    const isLit = (blink) => {
        return blink ? {backgroundColor: 'green'} : {backgroundColor: 'red'}
    }

    useEffect(() => {
        setBlinksBeatsArray(timeSignG.isBeat)
        return() => {
            setBlinksBeatsArray([])
        }
        //eslint-disable-next-line
    }, [timeSignG])

    useEffect(() => {

        return()=>{}
    }, [blinksBeatsArray])


    return (
        <section className='blink-section'>
            {blinksBeatsArray &&
            blinksBeatsArray.map((blink, index) => (
                <div className='bulb-rim' key={index} ref={addToRefs}>
                    <div className='blink-bulb' style={isLit(blink)}/>
                </div>
            ))}
        </section>
    )
}