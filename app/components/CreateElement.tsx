import React, { useState } from 'react';
import { NextFormElement, NextFormElementType } from '~/types/NextFormElement';

function CreateElement({
    nextFormElement,
}: {
    nextFormElement: NextFormElement;
}) {
    const [value, setValue] = useState(nextFormElement.value || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className="mb-4">
            {/* Render label */}
            {nextFormElement.label && (
                <label className="block mb-1 font-semibold border-b-">
                    {nextFormElement.label}
                    {nextFormElement.constraints?.required && <span className="text-red-500">*</span>}
                </label>
            )}
            {/* seperator */}
            <div className='w-[120px] bg-slate-900 h-[2px]'></div>
            {/* Render different input types based on nextFormElement.type */}
            {(() => {
                switch (nextFormElement.type) {
                    case NextFormElementType.SHORT_PARAGRAPH:
                    case NextFormElementType.URL:
                    case NextFormElementType.NUMBER:
                    case NextFormElementType.DATE:
                    case NextFormElementType.TIME:
                    case NextFormElementType.DATETIME:
                    case NextFormElementType.FILE:
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
                                className=" p-2 w-full border-b bg-slate-50 mt-2 border-gray-500 "
                            />
                        );

                    case NextFormElementType.LONG_PARAGRAPH:
                        return (
                            <textarea
                                value={value}
                                onChange={handleChange}
                                placeholder={nextFormElement.label}
                                required={nextFormElement.constraints?.required}
                                className="  p-2 w-full h-32 border-b  bg-slate-50 mt-2 border-gray-500"
                            />
                        );

                    case NextFormElementType.CHECKBOX:
                        return (
                            <input
                                type="checkbox"
                                checked={value === 'true'}
                                onChange={(e) => setValue(e.target.checked ? 'true' : 'false')}
                                className="cursor-pointer border  bg-slate-50 mt-2 border-gray-500"
                            />
                        );

                    case NextFormElementType.RADIO:
                        return (
                            <input
                                type="radio"
                                checked={value === 'true'}
                                onChange={(e) => setValue(e.target.checked ? 'true' : 'false')}
                                className="cursor-pointer border  bg-slate-50 mt-2 border-gray-500"
                            />
                        );

                    case NextFormElementType.SELECT:
                        return (
                            <select
                                value={value}
                                onChange={handleChange}
                                required={nextFormElement.constraints?.required}
                                className=" p-2 w-full border-b  bg-slate-50 mt-2 border-gray-500"
                            >
                               {
                                      nextFormElement.options?.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                      ))
                               }
                            </select>
                        );

                    default:
                        return <input type="text"  value={value} onChange={handleChange} className="   bg-slate-50 mt-2 border  p-2 w-full" />;
                }
            })()}
        </div>
    );
}

export default CreateElement;
