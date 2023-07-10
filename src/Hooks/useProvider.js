import { useState } from "react"
import strongBeepURL from '../assets/long-strong-beat.mp3'
import weakBeepURL from '../assets/long-weak-beat.mp3'


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmG, setBpmG] = useState(80)
    const [pulsesLine, setPulsesLine] = useState([strongBeepURL, weakBeepURL, weakBeepURL, strongBeepURL, weakBeepURL])
    const [timeSignG, setTimeSignG] = useState('5/4')
    const [resetAudioStructure, setResetAudioStructure] = useState(false)

    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG,
        pulsesLine, setPulsesLine,
        timeSignG, setTimeSignG,
        resetAudioStructure, setResetAudioStructure
    }
}

export default useProvider;