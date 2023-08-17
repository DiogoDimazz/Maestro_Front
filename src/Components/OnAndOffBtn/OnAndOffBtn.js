import { useEffect, useState } from 'react'
import usePlayConsumer from '../../Hooks/usePlayConsumer'
import './styles.css'
import useConsumer from '../../Hooks/useConsumer'

export const OnAndOffBtn = () => {
    const {setMetronomeOn} = usePlayConsumer()
    const {metronomeStandBy, setMetronomeStandBy} = useConsumer()
    const [btnText, setBtnText] = useState('')



    useEffect(() => {
        if(metronomeStandBy) {
            setBtnText('On')
            setMetronomeOn(true)
        } else {
            setBtnText('Off')
            setMetronomeOn(false)
        }
        return()=>{}
        //eslint-disable-next-line
    }, [metronomeStandBy])

    return(
        <div className='power-btn-conteiner'>
            <button
                onClick={() => setMetronomeStandBy(prev => !prev)}
                className='power-btn large-input-font'>
                {btnText}
            </button>
        </div>
    )
}