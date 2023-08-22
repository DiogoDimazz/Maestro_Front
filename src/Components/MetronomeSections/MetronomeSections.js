import './styles.css'
import { BpmRuler } from '../BpmRuler/BpmRuler'
import { BpmInput } from '../BpmInput/BpmInput'
import {Blinks} from '../Blinks/Blinks'
import { BpmChangeStructure } from '../BpmChangeStructure/BpmChangeStructure'
import { OnAndOffBtn } from '../OnAndOffBtn/OnAndOffBtn'
import { TimeSelect } from '../TimeSelect/TimeSelect'
import { useEffect, useState } from 'react'
import useConsumer from '../../Hooks/useConsumer'

export const MetronomeSections = () => {
    const { 
        setMetronomeStandBy,
        bpmChangeCoeficient, setBpmChangeCoeficient,
        bpmG, setBpmG,
        numberDetectionBlock
    } = useConsumer()
    const [bpmInputTransport, setBpmInputTransport] = useState(null)
    
    function numberTest(e) {
        if(!isNaN(e) && !bpmInputTransport) {
            setBpmInputTransport(e)
            window.removeEventListener('keydown', keyboardInput)
            return
        }
    }

    function keyboardInput(event) {
        event.preventDefault()
        switch (event.code) {
            case 'Space':
                console.log('right case');
                setMetronomeStandBy(prev => !prev)
                break;
            case 'ArrowUp':
                if(bpmChangeCoeficient >= 20) {return setBpmChangeCoeficient(20)}
                setBpmChangeCoeficient(prev => prev + 1)
                break;
            case 'ArrowDown':
                if(bpmChangeCoeficient <= 1) {return setBpmChangeCoeficient(1)}
                setBpmChangeCoeficient(prev => prev - 1)
                break;
            case 'ArrowRight':
                if(bpmG + bpmChangeCoeficient >= 300) {return setBpmG(300)}
                setBpmG(bpmG + bpmChangeCoeficient)
                break;
            case 'ArrowLeft':
                if(bpmG - bpmChangeCoeficient <= 40) {return setBpmG(40)}
                setBpmG(bpmG - bpmChangeCoeficient)
                break;
            default:
                numberTest(event.key)
                break;
        }
    }

    useEffect(() => {
        if(numberDetectionBlock) return;
        window.addEventListener('keydown', keyboardInput)
        return()=>{
            window.removeEventListener('keydown', keyboardInput)
        }
        //eslint-disable-next-line
    }, [bpmG, bpmChangeCoeficient, numberDetectionBlock])

    return (
        <main className='main-controls'>
            <div className='top-controls'>
                <BpmInput
                    bpmInputTransport={bpmInputTransport} setBpmInputTransport={setBpmInputTransport}
                    keyboardInput={keyboardInput}
                />
                <BpmRuler/>
            </div>
            <div className='blinks-row'>
                <Blinks/>
            </div>
            <div className='down-controls'>
                <div className='left-down-controls'>
                    <BpmChangeStructure/>
                </div>
                <div className='center-down-controls'>
                    <OnAndOffBtn/>
                </div>
                <div className='right-down-controls'>
                    <TimeSelect/>
                    <span>slider de volume</span>
                </div>
            </div>
        </main>
    )
}