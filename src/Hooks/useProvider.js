import { useState } from "react"


function useProvider() {
    const [metronomeStandBy, setMetronomeStandBy] = useState()
    const [bpmG, setBpmG] = useState(80)
    const [bpmChangeCoeficient, setBpmChangeCoeficient] = useState(4)
    const [numberDetectionBlock, setNumberDetectionBlock] = useState(false)
    const [timeSelection, setTimeSelection] = useState({
        time: '4/4',
        compoundMeter: false,
        beats: ['strong', 'weak', 'weak', 'weak'],
        isBeat: [false, false, false, false]
    })

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
        metronomeStandBy, setMetronomeStandBy,
        bpmG, setBpmG,
        bpmChangeCoeficient, setBpmChangeCoeficient,
        numberDetectionBlock, setNumberDetectionBlock,
        fastChangeCoeficient,
        timeSelection, setTimeSelection
    }
}

export default useProvider;