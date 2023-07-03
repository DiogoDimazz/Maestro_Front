import './styles.css'
import {useConsumer} from '../../Hooks/useConsumer'

export const Controls = () => {
    // const {metronomeOn, setMetronomeOn} = useConsumer()
    // const onAndOff = () => {
    //     setMetronomeOn(!metronomeOn)
    // };
    
    return (
        <main className='main-controls'>
            <div className='top-controls'>
                <span style={{fontSize: '27px', marginBottom: '10rem'}}>indicador de bpm</span>
                <span style={{fontSize: '27px'}}>Desenho com slider de bpms</span>
            </div>
            <div className='down-controls'>
                <div className='left-down-controls'>
                    <span>somador e sua estrutura</span>
                </div>
                <div className='center-down-controls'>
                    <span style={{width: '100%', backgroundColor: 'white', fontSize: '27px'}}>luzes indicadoras</span>
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