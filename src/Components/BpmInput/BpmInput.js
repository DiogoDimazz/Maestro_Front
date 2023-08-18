import { useEffect, useRef, useState } from 'react'
import './styles.css'
import useConsumer from '../../Hooks/useConsumer'

export const BpmInput = () => {
    const {
        setMetronomeStandBy,
        bpmG, setBpmG,
        numberDetectionBlock, fastChangeCoeficient
    } = useConsumer()

    const [localBpm, setLocalBpm] = useState('')
    const [previousBpm, setPreviousBpm] = useState()
    const [bpmErrorState, setBpmErrorState] = useState(false)
    const bpmInputRef = useRef(null)
    let isNewBpm = true
    const errorOutline = {border: '4px solid rgb(231, 37, 37)'}


    const keyboardInput = (event) => {
        event.preventDefault()
        if (event.code === "Space") {
            setMetronomeStandBy(prev => !prev)
            return
        }

        
        if(
            event.key === "ArrowRight" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown"
        ) {
            return fastChangeCoeficient(event.key)
        }
        
        if(!isNaN(event.key) && isNewBpm) {
            bpmInputRef.current.focus()
            bpmInputRef.current.value = ''
            isNewBpm = false
            return
        }
    }
    
    const inputingBpm = (e) => {
        e.preventDefault()
    
        const localValue = Number(bpmInputRef.current.value)
        if(localValue !== 0) {
            setLocalBpm(localValue)
        }

        if (localValue >= 40 && localValue <= 300) {
            setBpmG(localValue)
            setPreviousBpm(localValue)
            isNewBpm = true
            bpmInputRef.current.blur()
            return
        }
        
        
        if (localValue > 300) {
            setLocalBpm(previousBpm)
            isNewBpm = true
            bpmInputRef.current.blur()
            setBpmErrorState(true)
            
            setTimeout(() =>{
                setBpmErrorState(false)
            }, 1000)

            return
        }

    }

    useEffect(() => {
        setMetronomeStandBy(false)
    },[])
    
    useEffect(() => {
        setLocalBpm(bpmG)
        setPreviousBpm(bpmG)
        
        if(!numberDetectionBlock) {
            window.addEventListener('keydown', keyboardInput)
        }

        return()=>{
            window.removeEventListener('keydown', keyboardInput)
        }
        //eslint-disable-next-line
    }, [bpmG, bpmErrorState, numberDetectionBlock])

    return (
        <div className='bpm-input-main'>
            <div className='input-wrapper'>
                <input
                    ref={bpmInputRef}
                    className='input-style bpm-input large-input-font'
                    value={localBpm}
                    onChange={inputingBpm}
                    style={bpmErrorState ?  errorOutline : null}
                />
            </div>
            {
                bpmErrorState &&
                <span className='bpm-error-msg small-error-font'>Digite um valor entre 40 e 300</span>
            }
        </div>
    )
}
