import { useState } from "react"

function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)
    const [bpmG, setBpmG] = useState(120)

    return {
        metronomeOn, setMetronomeOn,
        bpmG, setBpmG
    }
}

export default useProvider;