import { useState } from "react"


function useProvider() {
    const [metronomeStandBy, setMetronomeStandBy] = useState()
    const [bpmG, setBpmG] = useState(80)
    const [bpmChangeCoeficient, setBpmChangeCoeficient] = useState(4)
    const [numberDetectionBlock, setNumberDetectionBlock] = useState(false)
    const [timeSelection, setTimeSelection] = useState()

    return {
        metronomeStandBy, setMetronomeStandBy,
        bpmG, setBpmG,
        bpmChangeCoeficient, setBpmChangeCoeficient,
        numberDetectionBlock, setNumberDetectionBlock,
        timeSelection, setTimeSelection
    }
}

export default useProvider;