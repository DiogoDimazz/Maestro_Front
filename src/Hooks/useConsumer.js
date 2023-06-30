import { useContext } from "react";
import ContextApi from "../Context/context";

export default function useConsumer() {
    return useContext(ContextApi)
}