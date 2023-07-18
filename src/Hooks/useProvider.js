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
    const [bpmChangeCoeficient, setBpmChangeCoeficient] = useState(4)
    const [numberDetectionBlock, setNumberDetectionBlock] = useState(false)
    
    const [resetAudioStructure, setResetAudioStructure] = useState(false)
    const [beatSources, setBeatSources] = useState([])
    const [beatBuffers, setBeatBuffers] = useState([])
    const [iterator, setIterator] = useState()
    const [audioCtx, setAudioCtxs] = useState();

    const fastChangeCoeficient = (name) => {
    
        switch (name) {
            case 'ArrowRight':
                if(bpmG + bpmChangeCoeficient >= 300) {return setBpmG(300)}
                setBpmG(bpmG + bpmChangeCoeficient)
                break;
            case 'ArrowLeft':
                if(bpmG - bpmChangeCoeficient <= 40) {return setBpmG(40)}
                setBpmG(bpmG - bpmChangeCoeficient)
                break;
            case 'ArrowUp':
                if(bpmChangeCoeficient >= 20) {return setBpmChangeCoeficient(20)}
                setBpmChangeCoeficient(prev => prev + 1)
                break
            case 'ArrowDown':
                if(bpmChangeCoeficient <= 1) {return setBpmChangeCoeficient(1)}
                setBpmChangeCoeficient(prev => prev - 1)
                break
            default:
                break;
        }
    }

    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG,
        timeSignG, setTimeSignG,
        bpmChangeCoeficient, setBpmChangeCoeficient,
        numberDetectionBlock, setNumberDetectionBlock,
        resetAudioStructure, setResetAudioStructure,
        beatSources, setBeatSources,
        beatBuffers, setBeatBuffers,
        iterator, setIterator,
        audioCtx, setAudioCtxs,
        fastChangeCoeficient
    }
}

export default useProvider;