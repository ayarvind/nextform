import React, { useState } from 'react';
import { NextFormElement, NextFormElementType } from '~/types/NextFormElement';
import Alert from '~/utils/Alert';

function CreateElement({
    nextFormElement,
    index,
    setNextFormElements
}: {
    nextFormElement: NextFormElement;
    index: number;
    setNextFormElements: React.Dispatch<React.SetStateAction<NextFormElement[]>>;
}) {
    const [value, setValue] = useState<string | string[]>(nextFormElement.value || '');
    const [files, setFiles] = useState<FileList | null>(null);
    // const [alert, setAlert] = useState<AlertProps | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(event.target.value);
        setNextFormElements((prev) => {
            const newElements = [...prev];
            newElements[index] = {
                ...newElements[index],
                value: event.target.value
            };
            return newElements;
        })

    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(event.target.files);
            setNextFormElements((prev) => {
                const newElements = [...prev];
                newElements[index] = {
                    ...newElements[index],
                    files: Array.from(event.target.files || []),
                    value : undefined
                };
                return newElements;
            }) 

          

        } else {
            setFiles(null)
        }
    }
    console.log('NextFormElement:', nextFormElement);

    return (
        <div className="mb-4">
            {/* Render label */}
            {nextFormElement.label && (
                <label className="block mb-1 font-semibold">
                    {nextFormElement.label}
                    {nextFormElement.constraints?.required && <span className="text-red-500"> *</span>}
                </label>
            )}

            {/* Separator */}
            <div className='w-[120px] bg-slate-900 h-[2px] mb-2'></div>

            {/* Render different input types based on nextFormElement.type */}
            {(() => {
                switch (nextFormElement.type) {
                    case NextFormElementType.SHORT_ANSWER:
                    case NextFormElementType.URL:
                    case NextFormElementType.NUMBER:
                    case NextFormElementType.DATE:
                    case NextFormElementType.PASSWORD:
                    case NextFormElementType.TIME:
                    case NextFormElementType.EMAIL:
                        return (
                            <input
                                type={nextFormElement.type}
                                value={value}
                                onChange={handleChange}
                                placeholder={nextFormElement.label}
                                required={nextFormElement.constraints?.required}
                                min={nextFormElement.constraints?.min}
                                max={nextFormElement.constraints?.max}
                                pattern={nextFormElement.constraints?.pattern}
                                className="w-full  p-1 border-b bg-slate-50 mt-2 border-gray-500"
                            />
                        );

                    case NextFormElementType.PARAGRAPH:
                        return (
                            <textarea
                                value={value}
                                onChange={handleChange}
                                placeholder={nextFormElement.label}
                                required={nextFormElement.constraints?.required}
                                className="w-full p-1 h-32 border-b bg-slate-50 mt-2 border-gray-500"
                            />
                        );


                    case NextFormElementType.SELECT:
                        return (
                            <select

                                multiple={
                                    nextFormElement.constraints?.multiple ? true : false
                                }
                                value={value}
                                onChange={handleChange}
                                required={nextFormElement.constraints?.required}
                                className="w-full p-1 border-b bg-slate-50 mt-2 border-gray-500"
                            >
                                {nextFormElement.options?.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        );
                    case NextFormElementType.CHECKBOX_GROUP:
                        return (
                            <>
                                <p className="flex space-x-4 text-sm text-gray-700">
                                    <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                        Min: {nextFormElement?.constraints?.minSelected}
                                    </span>
                                    <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                        Max: {nextFormElement?.constraints?.maxSelected}
                                    </span>
                                </p>
                                {

                                    nextFormElement.options?.map((option, index) => (
                                        <div key={index} className="flex flex-col justify-center">

                                            <div className="flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={value.includes(option)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            {

                                                                if (nextFormElement.constraints?.maxSelected && value.length < nextFormElement.constraints.maxSelected) {
                                                                    setValue([...(value as string[]), option])
                                                                }
                                                            }
                                                        } else {
                                                            setValue((value as string[]).filter((val) => val !== option));
                                                        }
                                                    }}
                                                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 transition duration-200 ease-in-out cursor-pointer"
                                                />
                                                <label className="ml-2 text-gray-800 font-medium text-sm cursor-pointer">{option}</label>
                                            </div>
                                        </div>

                                    ))
                                }
                            </>
                        )
                    case NextFormElementType.RADIO_GROUP:
                        return (
                            <>

                                {

                                    nextFormElement.options?.map((option, index) => (
                                        <div key={index} className="flex flex-col justify-center">

                                            <div className="flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={value === option}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            {
                                                                setValue(option)

                                                            }
                                                        } else {
                                                            setValue('')
                                                        }
                                                    }}
                                                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 transition duration-200 ease-in-out cursor-pointer"
                                                />
                                                <label className="ml-2 text-gray-800 font-medium text-sm cursor-pointer">{option}</label>
                                            </div>
                                        </div>

                                    ))
                                }
                            </>
                        )
                    case NextFormElementType.FILE:
                        return (
                            <input
                                type="file"
                                onChange={handleFileChange}
                                required={nextFormElement.constraints?.required}
                                accept={nextFormElement.constraints?.fileTypes?.join(',')}
                                multiple={nextFormElement.constraints?.multiple}
                                className="w-full p-1 border-b bg-slate-50 mt-2 border-gray-500"
                            />
                        );
                    default:
                        return (
                            <>
                                <input 
                                    type="file" 
                                    onChange={handleFileChange} 
                                    required={nextFormElement.constraints?.required} 
                                    accept={nextFormElement.constraints?.fileTypes?.join(',')} 
                                    multiple={nextFormElement.constraints?.multiple} 
                                    className="w-full border-b bg-slate-50 mt-2 border-gray-500"
                                    />
                                
                            </>
                        );
                }
            })()}

            {/* Render alert */}

        </div>
    );
}

export default CreateElement;
