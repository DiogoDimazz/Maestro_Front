import { useState } from "react"
import strongBeepURL from '../assets/strong_beep-in40.mp3'
import weakBeepURL from '../assets/weak_beep-in40.mp3'

function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmG, setBpmG] = useState(120)
    const [timeSignatureG, setTimeSignatureG] = useState([strongBeepURL, weakBeepURL, weakBeepURL])


    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG,
        timeSignatureG, setTimeSignatureG
    }
}

export default useProvider;