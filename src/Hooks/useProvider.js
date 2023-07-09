import { useState } from "react"
import strongBeepURL from '../assets/Short_Bip.mp3'
import weakBeepURL from '../assets/medium-beat.mp3'


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmG, setBpmG] = useState(300)
    const [timeSignatureG, setTimeSignatureG] = useState([strongBeepURL, weakBeepURL, weakBeepURL, strongBeepURL, weakBeepURL])


    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG,
        timeSignatureG, setTimeSignatureG
    }
}

export default useProvider;