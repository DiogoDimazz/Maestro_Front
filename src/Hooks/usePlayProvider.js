import { useState } from "react"

function usePlayProvider() {
    const [metronomeOn, setMetronomeOn] = useState()
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
        timeSignG, setTimeSignG,
        resetAudioStructure, setResetAudioStructure,
        beatSources, setBeatSources,
        beatBuffers, setBeatBuffers,
        iterator, setIterator,
        audioCtx, setAudioCtxs,
    }
}

export default usePlayProvider;