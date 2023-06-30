import './styles.css';
import metronomo from '../../assets/Metronomo_2.png';
import pendulum from '../../assets/haste.png';
import weightPiece from '../../assets/peso.png';
import useConsumer from '../../Hooks/useConsumer'
import { SoundGenerator } from '../SoundGenerator/SoundGenerator';

export const LeftContainer = () => {
    const {metronomeOn, setMetronomeOn} = useConsumer()
    const onAndOff = () => {
        setMetronomeOn(!metronomeOn)
    };
    


    return (
        <section className="left-container">
            <div className="metronome-montage">
                <img src={metronomo} alt="metronomo" className="metronome-img" />
                <img src={pendulum} alt="pendulum" className="pendulum-img" />
                <img src={weightPiece} alt="weight" className="weight-img" />
            </div>
        <div className="controls">
            <button className="on-off-btn" onClick={onAndOff}>
                Power
            </button>
            <div>Bpm indicator</div>
        </div>
        <SoundGenerator/>
        </section>
    );
};
