import { useState } from "react"

function useProvider() {
    const [metronomeOn, setMetronomeOn] = useState(false)

    return {
        metronomeOn, setMetronomeOn
    }
}

export default useProvider;