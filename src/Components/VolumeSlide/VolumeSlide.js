import { useEffect, useState, useRef } from 'react'
import './styles.css'
import Draggable from 'react-draggable'
import useConsumer from '../../Hooks/useConsumer'

export const VolumeSlide = () => {
    const {
        volume, setVolume
    } = useConsumer()
    const [volHandlePosition, setVolHandlePosition] = useState()
    const [volLineDivision, setVolLineDivision] = useState(0)
    const volLineRef = useRef()
    const dragVolRef = useRef()

    const volDrag = (e, data) => {
        setVolHandlePosition(data.y);
        const value = Number(((data.y/-volLineDivision)+5).toFixed(2))
        if (value > 5) {return setVolume(5)}
        if (value <= 0) {return setVolume(0)}
        setVolume(value)
    }

    function volDrop(e, data) {
        
        // const finalValue = Number(-1 * ((data.y/volLineDivision)-11)) 
        // if (finalValue < -6) {setVolume(-6)}
        // else if (finalValue > 6) {setVolume(6)}
        // else setVolume(finalValue);
    }

    function getVolLineSize() {
        setVolLineDivision(Number(((20*(volLineRef.current.offsetHeight-5))/100).toFixed(2)));
    }
    
    function getVolHandlePosition() {
        console.log(volLineDivision);
        setVolHandlePosition((volume-5)* -volLineDivision)
    }

    useEffect(() => {
        getVolHandlePosition()
        return()=>{}
        //eslint-disable-next-line
    }, [volLineDivision])

    useEffect(() => {
        window.addEventListener('resize', getVolLineSize)
        getVolLineSize()
        setVolume(2.5)
        return()=>{
            window.removeEventListener('resize', getVolLineSize)
        }
        //eslint-disable-next-line
    }, [])

    return (
    <main className='volume-conteiner'>
        <div className='volume-line' ref={volLineRef}/>
        <Draggable
            axis='y'
            bounds={'.volume-line'}
            handle='.volume-handle'
            onDrag={volDrag}
            onStop={volDrop}
            position={{x: 0, y: volHandlePosition}}
            ref={dragVolRef}
            >
            <div className='slider-handle volume-handle'/>
        </Draggable>
    </main>
    )
}