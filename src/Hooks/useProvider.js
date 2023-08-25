import { useState } from "react"

function useProvider() {
    const [metronomeStandBy, setMetronomeStandBy] = useState()
    const [bpmG, setBpmG] = useState(80)
    const [inputBpm, setInputBpm] = useState(80)
    const [bpmChangeCoeficient, setBpmChangeCoeficient] = useState(4)
    const [numberDetectionBlock, setNumberDetectionBlock] = useState(false)
    const [timeSelection, setTimeSelection] = useState()
    const [isSubdivided, setIsSubdivided] = useState(false)

    return {
        metronomeStandBy, setMetronomeStandBy,
        bpmG, setBpmG,
        inputBpm, setInputBpm,
        bpmChangeCoeficient, setBpmChangeCoeficient,
        numberDetectionBlock, setNumberDetectionBlock,
        timeSelection, setTimeSelection,
        isSubdivided, setIsSubdivided
    }
}

export default useProvider;