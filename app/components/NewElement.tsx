import { RiAddLine } from '@remixicon/react'
import React, { useState } from 'react'
import { useNextFormContext } from '~/context/useNextFormContext';
import { NextFormElementType ,NextFormElement} from '~/types/NextFormElement'

function NewElement(): React.ReactElement {

    const {nextFormElements,setNextFormElements} = useNextFormContext();
    const [elementId,setElementId] = useState<number>(1);
    const pushNew = () => {
        
        const nextForm = {
            elementId,
            name:`untitled`,
            type: NextFormElementType.SHORT_ANSWER,
            label: `Untitled`,
            constraints: {
                required: false
            }

        }
        setElementId(elementId + 1);
        setNextFormElements([...nextFormElements,nextForm])

    }
    return (
        <div className="flex justify-center items-center">
            <div className="relative">
                <button onClick={pushNew} className="absolute p-3 bg-black text-white text-center rounded-full">
                    <RiAddLine className="text-white" size={24} />
                </button>
            </div>
        </div>
    )
}

export default NewElement