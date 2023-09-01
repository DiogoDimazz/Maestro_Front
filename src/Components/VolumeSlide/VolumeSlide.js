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
    const [mutePosition, setMutePosition] = useState()
    const volLineRef = useRef()
    const dragVolRef = useRef()
    const volHandleRef = useRef()
    const [isMute, setIsMute] = useState(false)
    const [previousVolume, setPreviousVolume] = useState(null)

    const handleMute = (e) => {
        e.preventDefault()
        if(!isMute) {
            setPreviousVolume(volume)
            setVolume(0)
            setIsMute(true)
            return
        }
        setVolume(previousVolume)
        setIsMute(false)

    }

    const volDrag = (e, data) => {
        setVolHandlePosition(data.y);
        const value = Number(((3.5 - (data.y/volLineDivision)*0.25)).toFixed(2))
        if (value > 5) {return setVolume(5)}
        if (value <= 0 || data.y === mutePosition) {return setVolume(0)}
        isMute ? setPreviousVolume(value) : setVolume(value)
    }

    function handleDoubleClick() {
        setVolume(1)
        getVolHandlePosition()
    }

    function getVolLineSize() {
        const value = volLineRef.current.offsetHeight-volHandleRef.current.offsetHeight
        setMutePosition(value)
        setVolLineDivision(Number(value/14).toFixed(1));
    }
    
    function getVolHandlePosition() {
        setVolHandlePosition(mutePosition - (volLineDivision*4))
    }

    useEffect(() => {
        getVolHandlePosition()
        return()=>{}
        //eslint-disable-next-line
    }, [volLineDivision, mutePosition])

    useEffect(() => {
        window.addEventListener('resize', getVolLineSize)
        getVolLineSize()
        setVolume(1)
        return()=>{
            window.removeEventListener('resize', getVolLineSize)
            setIsMute(false)
        }
        //eslint-disable-next-line
    }, [])

    return (
    <main className='volume-conteiner'>
        <div className='volume-line-conteiner'>
            <div className='volume-line' ref={volLineRef}/>
            <Draggable
                axis='y'
                bounds={'.volume-line'}
                handle='.volume-handle'
                onDrag={volDrag}
                position={{x: 0, y: volHandlePosition}}
                ref={dragVolRef}
                >
                <div
                onDoubleClick={handleDoubleClick}
                className='slider-handle volume-handle'
                ref={volHandleRef}
                style={{backgroundColor: isMute ? 'var(--blue-600)' : 'var(--blue-200'}}
                />
            </Draggable>
        </div>
        <button
        className='mute-btn small-input-font'
        onClick={handleMute}
        style={isMute ? {backgroundColor: 'var(--blue-600)', color: 'white'} : {backgroundColor: 'var(--blue-200)', color: 'black'}}
        >Mute</button>
    </main>
    )
}