import useConsumer from '../../Hooks/useConsumer'
import './styles.css'

export const Blinks = () => {
    const {pulsesLine} = useConsumer()

    return (
        <section className='blink-section'>
            {pulsesLine.map((blink, index) => (
                <div className='bulb-rim'>
                    <div className='blink-bulb'/>
                </div>
            ))}
        </section>
    )
}