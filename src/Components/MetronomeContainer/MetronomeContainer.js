import './styles.css';
import { SoundGenerator } from '../SoundGenerator/SoundGenerator';
import { MetronomeSections } from '../MetronomeSections/MetronomeSections';
import { TheClock } from '../TheClock/TheClock';

export const MetronomeContainer = () => {

    return (
        <section className="metronome-container">
            <MetronomeSections/>
            <SoundGenerator/>
            <TheClock/>
        </section>
    );
};
