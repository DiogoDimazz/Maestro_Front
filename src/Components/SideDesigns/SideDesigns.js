import './styles.css'
import metronomeImage from '../../assets/Metronomo_2.png'

export const SideDesigns = ({side}) => {
    
    return (
        <div className="side-background">
            <img src={metronomeImage} alt='metronome-img' className='metronome-img' style={side}/>
        </div>
    )
}