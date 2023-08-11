import useConsumer from '../../Hooks/useConsumer'
import './styles.css'
import { timeSignaturesData } from '../../Data/TimeSignatureData'
import { useState } from 'react'
import arrow from '../../assets/arrow.svg'

export const TimeSelect = () => {
    const {setTimeSelection} = useConsumer()
    const [selectValue, setSelectValue] = useState(1)

    const handleChangeTime = (e) => {
        if(e.target.value === '8') {
            setTimeSelection(timeSignaturesData[1])
            setSelectValue(1)
            return
        }
        setSelectValue(e.target.value)
        setTimeSelection(timeSignaturesData[e.target.value])
    }

    return (
        <div className='main-time-input input-style'>
            <select 
            className='select-box large-input-font' 
            value={selectValue} 
            onChange={handleChangeTime}
            >
                <option value={0}>beat simples</option>
                <option value={1}>4/4</option>
                <option value={2}>3/4</option>
                <option value={3}>2/4</option>
                <option value={4}>6/8</option>
                <option value={5}>3/8</option>
                <option value={6}>9/8</option>
                <option value={7}>12/8</option>
                <option value={8}>Outra...</option>
            </select>
            <img src={arrow} alt='arrow' className='arrow select-arrow'/>
        </div>
    )
}