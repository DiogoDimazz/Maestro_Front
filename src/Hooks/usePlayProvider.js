import { useState } from "react"

function usePlayProvider() {
    const [metronomeOn, setMetronomeOn] = useState()
    const [timeSignG, setTimeSignG] = useState()
    
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