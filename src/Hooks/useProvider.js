import { useState } from "react"
import strongBeepURL from '../assets/strong-beat.mp3'
import weakBeepURL from '../assets/weak-beat.mp3'

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