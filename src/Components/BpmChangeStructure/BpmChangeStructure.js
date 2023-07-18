import './styles.css'
import arrow from '../../assets/arrow.png'
import useConsumer from '../../Hooks/useConsumer'
import { useEffect, useRef, useState } from 'react'


export const BpmChangeStructure = () => {
    const {
        bpmG, setBpmG,
        bpmChangeCoeficient, setBpmChangeCoeficient,
        numberDetectionBlock, setNumberDetectionBlock,
        fastChangeCoeficient
    } = useConsumer()
    const [localCoeficient, setLocalCoeficient] = useState()
    const coeficientRef = useRef()

const handleChangeCoeficient = (e) => {
    e.preventDefault()
    setLocalCoeficient(e.target.value)

}

const handleOnBlock = (e) => {
    e.preventDefault()
    setNumberDetectionBlock(true)
    setLocalCoeficient('')
}

const handleOffBlock = (e) => {
    e.preventDefault()
    setNumberDetectionBlock(false)
}

const bpmChangeInput = ({key}) => {
    if (key !== 'Enter') return
    const value = coeficientRef.current.value
    if (
        isNaN(value) ||
        Number(value) > 20 ||
        Number(value) <= 0
        ) {
        setLocalCoeficient(bpmChangeCoeficient)
    } else {
        setBpmChangeCoeficient(Number(value))
    }
    coeficientRef.current.blur()

}

useEffect(() => {

    if (numberDetectionBlock) {
        window.addEventListener('keydown', bpmChangeInput)
    }
    return()=>{
        window.removeEventListener('keydown', bpmChangeInput)
    }
}, [numberDetectionBlock])

useEffect(()=>{
    setLocalCoeficient(bpmChangeCoeficient)
    return()=>{}
}, [bpmChangeCoeficient])

    return (
        <section className='fast-bpm-section'>
            <input
                value={localCoeficient}
                className='bpm-coeficient-input input-style large-input-font'
                onChange={handleChangeCoeficient}
                onFocus={handleOnBlock}
                onBlur={handleOffBlock}
                ref={coeficientRef}
            />
            <img
                src={arrow}
                name='ArrowUp'
                onClick={(e) => fastChangeCoeficient(e.target.name)}
                alt='arrow'
                className='up-arrow arrow'/>
            <img
                src={arrow}
                name='ArrowLeft'
                onClick={(e) => fastChangeCoeficient(e.target.name)}
                alt='arrow'
                className='left-arrow arrow'/>
            <img
                src={arrow}
                name='ArrowRight'
                onClick={(e) => fastChangeCoeficient(e.target.name)}
                alt='arrow'
                className='right-arrow arrow'/>
            <img
                src={arrow}
                name='ArrownDown'
                onClick={(e) => fastChangeCoeficient(e.target.name)}
                alt='arrow'
                className='down-arrow arrow'/>
        </section>
    )
}