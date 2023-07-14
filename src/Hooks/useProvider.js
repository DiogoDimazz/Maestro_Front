import { useState } from "react"


function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmG, setBpmG] = useState(80)
    const [timeSignG, setTimeSignG] = useState({
        time: '4/4',
        compoundMeter: false,
        beats: ['strong', 'weak', 'weak', 'weak'],
        isBeat: [false, false, false, false]
    })
    const [resetAudioStructure, setResetAudioStructure] = useState(false)
    const [beatSources, setBeatSources] = useState([])
    const [beatBuffers, setBeatBuffers] = useState([])
    const [iterator, setIterator] = useState()
    const [audioCtx, setAudioCtxs] = useState();

    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG,
        timeSignG, setTimeSignG,
        resetAudioStructure, setResetAudioStructure,
        beatSources, setBeatSources,
        beatBuffers, setBeatBuffers,
        iterator, setIterator,
        audioCtx, setAudioCtxs
    }
}

export default useProvider;