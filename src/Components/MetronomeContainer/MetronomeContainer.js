import './styles.css';
import { SoundGenerator } from '../SoundGenerator/SoundGenerator';
import { Controls } from '../Controls/Controls';

export const MetronomeContainer = () => {


    return (
        <section className="metronome-container">
            <Controls/>
            <SoundGenerator/>
        </section>
    );
};
