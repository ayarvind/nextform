import { RiAddLine } from '@remixicon/react'
import React from 'react'
import { useNextFormContext } from '~/context/useNextFormContext';
import { NextFormElementType ,NextFormElement} from '~/types/NextFormElement'

function NewElement(): React.ReactElement {

    const {nextFormElements,setNextFormElements} = useNextFormContext();
    const pushNew = () => {
        const nextForm = {
            name:`untitled`,
            type: NextFormElementType.SHORT_PARAGRAPH,
            label: `Untitled`,
            constraints: {
                required: false
            }

        }
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