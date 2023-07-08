import { useState } from "react"
import strongBeepURL from '../assets/long-strong-beat.mp3'
import weakBeepURL from '../assets/long-weak-beat.mp3'


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmG, setBpmG] = useState(40)
    const [timeSignatureG, setTimeSignatureG] = useState([strongBeepURL, weakBeepURL, weakBeepURL, strongBeepURL, weakBeepURL, strongBeepURL, weakBeepURL, weakBeepURL, strongBeepURL, weakBeepURL, strongBeepURL, weakBeepURL])


    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG,
        timeSignatureG, setTimeSignatureG
    }
}

export default useProvider;