import './styles.css';
import { MetronomeSections } from '../MetronomeSections/MetronomeSections';
import {SoundGenerator} from '../SoundGenerator/SoundGenerator'
import {TheClock} from '../TheClock/TheClock'

export const MetronomeContainer = () => {

    return (
        <section className="metronome-container">
            <MetronomeSections/>
            <SoundGenerator/>
            <TheClock/>
        </section>
    );
};
