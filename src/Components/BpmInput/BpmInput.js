import { useEffect, useRef, useState } from 'react'
import './styles.css'
import useConsumer from '../../Hooks/useConsumer'

export const BpmInput = () => {
    const {setMetronomeOn, bpmG, setBpmG, isNewBpmInput, setIsNewBpmInput} = useConsumer()
    const [localBpm, setLocalBpm] = useState()
    const [previousBpm, setPreviousBpm] = useState()
    const bpmInputRef = useRef(null)
    let isNewBpm = true

    const keyboardInput = ({code, key}) => {
        if (code === "Space") {return setMetronomeOn(prev => !prev)}
        
        if(!isNaN(key) && isNewBpm) {
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
            return
        }

    }
    
    useEffect(() => {
        setLocalBpm(bpmG)
        setPreviousBpm(bpmG)
        
        window.addEventListener('keydown', keyboardInput)
        return()=>{
            window.removeEventListener('keydown', keyboardInput)
        }
        //eslint-disable-next-line
    }, [bpmG])
    
    return (
        <div className='bpm-input-main'>
            <input
                ref={bpmInputRef}
                className='bpm-input large-input-font'
                value={localBpm}
                onChange={inputingBpm}
            />
        </div>
    )
}