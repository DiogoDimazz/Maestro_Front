import useConsumer from '../../Hooks/useConsumer'
import './styles.css'
import { timeSignaturesData } from '../../Data/TimeSignatureData'
import { useEffect, useState } from 'react'
import arrow from '../../assets/arrow.svg'

export const TimeSelect = () => {
    const {timeSelection, setTimeSelection} = useConsumer()
    const [selectValue, setSelectValue] = useState()
    const [timeModal, setTimeModal] = useState()

    const handleModal = () => {
        setTimeModal(prev=>!prev)
    }

    const setTime = (e) => {
        e.preventDefault()

        switch (e.target.innerText) {
            case 'beat simples':
                setTimeSelection(timeSignaturesData[0])
                break;
            case '4/4':
                setTimeSelection(timeSignaturesData[1])
                break;
            case '3/4':
                setTimeSelection(timeSignaturesData[2])
                break;
            case '2/4':
                setTimeSelection(timeSignaturesData[3])
                break;
            case '6/8':
                setTimeSelection(timeSignaturesData[4])
                break;
            case '3/8':
                setTimeSelection(timeSignaturesData[5])
                break;
            case '9/8':
                setTimeSelection(timeSignaturesData[6])
                break;
            case '12/8':
                setTimeSelection(timeSignaturesData[7])
                break;
            default:
                break;
        }

        setTimeModal(false)
    }

useEffect(() => {
    if(timeSelection) {
        setSelectValue(timeSelection.time)
    }
}, [timeSelection])

useEffect(() => {
    setTimeSelection({...timeSignaturesData[1]})
    setTimeModal(false)
}, [])

    return (
        <div className='main-time-input'>
            <div 
            className='select-box large-input-font input-style' 
            value={selectValue} 
            onClick={handleModal}
            >
                {selectValue}
                <img src={arrow} alt='arrow' className='arrow select-arrow'/>
            </div>
            {timeModal &&
                <ul className='time-modal'>
                    {timeSignaturesData.map((time, index) => (
                        <li 
                            className='time-option' 
                            onClick={setTime}
                            key={index}
                            >
                                {time.time}
                            </li>
                    ))}
                </ul>   
            }
        </div>
    )
}