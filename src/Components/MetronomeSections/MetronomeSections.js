import './styles.css'
import { BpmRuler } from '../BpmRuler/BpmRuler'
import { BpmInput } from '../BpmInput/BpmInput'
import { Blinks } from '../Blinks/Blinks'
import { BpmChangeStructure } from '../BpmChangeStructure/BpmChangeStructure'

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
            {/* <div className="controls">
                <button className="on-off-btn" onClick={onAndOff}>
                    Power
                </button>
                <div>Bpm indicator</div>
            </div> */}
                    <span style={{marginTop: '17rem'}}>On e Off</span>
                </div>
                <div className='right-down-controls'>
                    <span>indicador de formula de compasso</span>
                    <span>slider de volume</span>
                </div>
            </div>
        </main>
    )
}