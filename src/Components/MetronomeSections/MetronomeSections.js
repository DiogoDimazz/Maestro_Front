import './styles.css'
import { BpmRuler } from '../BpmRuler/BpmRuler'
import { BpmInput } from '../BpmInput/BpmInput'
import {Blinks} from '../Blinks/Blinks'
import { BpmChangeStructure } from '../BpmChangeStructure/BpmChangeStructure'
import { OnAndOffBtn } from '../OnAndOffBtn/OnAndOffBtn'
import { TimeSelect } from '../TimeSelect/TimeSelect'

export const MetronomeSections = () => {

    return (
        <main className='main-controls'>
            <div className='top-controls'>
                <BpmInput/>
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