import { createContext } from "react";
import usePlayProvider from "../Hooks/usePlayProvider";

const PlayContextApi = createContext({})

export function PlayContextProvider(props) {
    const thePlayProvider = usePlayProvider()

    return (
        <PlayContextApi.Provider value={thePlayProvider}>{props.children}</PlayContextApi.Provider>
    )
}

export default PlayContextApi