import './styles.css'
import { BpmRuler } from '../BpmRuler/BpmRuler'
import { BpmInput } from '../BpmInput/BpmInput'
import { Blinks } from '../Blinks/Blinks'

export const Controls = () => {
    // const {metronomeOn, setMetronomeOn} = useConsumer()
    // const onAndOff = () => {
    //     setMetronomeOn(!metronomeOn)
    // };
    
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
                    <span>somador e sua estrutura</span>
                </div>
                <div className='center-down-controls'>
                    <span style={{marginTop: '17rem'}}>On e Off</span>
                </div>
                <div className='right-down-controls'>
                    <span>indicador de formula de compasso</span>
                    <span>slider de volume</span>
                </div>
            </div>
            {/* <div className="controls">
                <button className="on-off-btn" onClick={onAndOff}>
                    Power
                </button>
                <div>Bpm indicator</div>
            </div> */}
        </main>
    )
}