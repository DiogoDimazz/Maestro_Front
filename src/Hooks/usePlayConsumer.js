import { useContext } from "react";
import PlayContextApi from "../Context/playContext";

export default function usePlayConsumer() {
    return useContext(PlayContextApi)
}