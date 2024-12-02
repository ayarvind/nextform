import { useEffect, useState } from 'react';
import { useNextFormContext } from '~/context/useNextFormContext';
import { useNextFormPropsDefiner } from '~/context/useNextFormPropsDefiner';
import { NextFormElementType } from '~/types/NextFormElement';
import { fileTypeList } from '~/data/fileTypeList';
import Alert, { AlertProps } from '~/utils/Alert';
function PropertyDefiner() {
    const { currentElement, setCurrentElement } = useNextFormPropsDefiner();
    const { nextFormElements, setNextFormElements } = useNextFormContext();
    // const [error, setError] = useState<AlertProps | null>();
    const handleChange = (field: string, value: any) => {
        if (!currentElement) return;

        const index = currentElement.index;

        setNextFormElements((prev) => {
            const newElements = [...prev];
            newElements[index] = {
                ...newElements[index],
                [field]: value,
            };
            return newElements;
        });

        setCurrentElement({
            ...currentElement,
            element: {
                ...currentElement.element,
                [field]: value,
            },
        });
    };

    if (!currentElement) {
        return (<>
            <div className='p-5 m-auto flex flex-col justify-center items-center'>
                <img src='/icons/empty.webp' alt="Empty" className="w-1/2 mx-auto" />
                <h1 className='text-center text-lg font-medium text-gray-600'>
                    Create a new element or select an existing element to edit its properties
                </h1>
            </div>
        </>)
    }



    useEffect(() => {

        if (currentElement.element.constraints?.disableFutureDates) {
            handleChange('constraints', {
                ...currentElement.element.constraints,
                max: new Date().toISOString().split("T")[0],
            })
        } else {
            handleChange('constraints', {
                ...currentElement.element.constraints,
                max: undefined,
            })
        }

    }, [currentElement.element.constraints?.disableFutureDates])



    return (
        <>
            <div className="p-6 bg-white rounded-lg w-full overflow-auto h-full max-w-2xl mx-auto">
                <div className="flex justify-start gap-4 mb-4">
                    <div className="badges bg-black text-white text-center w-9 h-9 flex justify-center items-center">
                        {currentElement.element.elementId ? currentElement.element.elementId : currentElement.index + 1}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Define field Properties</h2>
                </div>

                {/* Name Input */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        value={currentElement.element.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full border-b-2 border-gray-300"
                        placeholder="Enter a unique name for the element"
                    />
                </div>

                {/* Label Input */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Label:</label>
                    <input
                        type="text"
                        value={currentElement.element.label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                        className="w-full border-b-2 border-gray-300"
                        placeholder="Enter label for the element"
                    />
                </div>


                {/* dependOns */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Depends on:</label>
                    <input
                        type="number"
                        min={1}
                        max={nextFormElements.length}
                        value={currentElement.element.dependsOn !== undefined ? currentElement.element.dependsOn + 1 : ''}
                        onChange={(e) => {
                            const inputValue = Number(e.target.value);
                            if (
                                inputValue > 0 &&
                                inputValue <= nextFormElements.length &&
                                inputValue !== currentElement.index + 1
                            ) {
                                handleChange('dependsOn', inputValue - 1);
                            } else {
                                console.log('Invalid value:', e.target.value);
                            }
                        }}
                        className="w-full border-b-2 border-gray-300 p-2"
                        placeholder="Enter the field number"
                    />
                </div>


                {/* value input */}

                {/* <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Value:</label>
                <input
                    type="text"
                    readOnly
                    value={currentElement.element.value || ''}
                    className="w-full border-b-2 border-gray-300"
                />
            </div> */}

                {/* Type Selector */}
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Type:</label>
                    <select
                        value={currentElement.element.type || NextFormElementType.SHORT_ANSWER}
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full border-b-2 border-gray-300"
                    >
                        {Object.keys(NextFormElementType).map((key) => {
                            const value = NextFormElementType[key as keyof typeof NextFormElementType];
                            const parseKey = key.replace(/_/g, ' ').toUpperCase();
                            return (
                                <option key={value} value={value}>
                                    {parseKey}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Required Checkbox */}
                <div className="mb-5 flex items-center">
                    <input
                        type="checkbox"
                        checked={currentElement.element.constraints?.required || false}
                        onChange={(e) => handleChange('constraints', {
                            ...currentElement.element.constraints,
                            required: e.target.checked,
                        })}
                        className="mr-2 h-5 w-5"
                    />
                    <label className="text-gray-700 text-sm font-medium">Required</label>
                </div>



                {/* Constraints for Numbers */}
                {currentElement.element.type === NextFormElementType.NUMBER && (
                    <>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Min Value:</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.min || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    min: Number(e.target.value),
                                })}
                                className="w-full border-b-2 border-gray-300"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Max Value:</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.max || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    max: Number(e.target.value),
                                })}
                                className="w-full border-b-2 border-gray-300"
                            />
                        </div>
                    </>
                )}

                {/* 
                if type is date
                
            */}

                {
                    currentElement.element.type == NextFormElementType.DATE && (
                        <div className="flex flex-col gap-6 items-start">
                            {/* Checkbox to Disable Future Dates */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={currentElement.element.constraints?.disableFutureDates || false}
                                    onChange={(e) => {
                                        handleChange('constraints', {
                                            ...currentElement.element.constraints,
                                            disableFutureDates: e.target.checked,
                                        });


                                    }}
                                    className="mr-2 h-5 w-5"
                                />
                                <label className="text-gray-700 text-sm font-medium">Disable Future Dates</label>
                            </div>

                            {/* Minimum Date Input */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="min-date" className="text-sm font-medium text-gray-600">
                                    Minimum Date
                                </label>
                                <input
                                    id="min-date"
                                    onChange={(e) =>
                                        handleChange("constraints", {
                                            ...currentElement.element.constraints,
                                            min: e.target.value,
                                        })
                                    }
                                    type="date"
                                    placeholder="Select minimum date"
                                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:ring-1 focus:ring-blue-400"
                                />
                            </div>

                            {/* Maximum Date Input */}
                            <div className="flex flex-col w-full">
                                <label htmlFor="max-date" className="text-sm font-medium text-gray-600">
                                    Maximum Date
                                </label>
                                <input
                                    id="max-date"
                                    onChange={(e) =>
                                        handleChange("constraints", {
                                            ...currentElement.element.constraints,
                                            max: e.target.value,
                                        })
                                    }
                                    max={
                                        currentElement.element.constraints?.disableFutureDates
                                            ? new Date().toISOString().split("T")[0]
                                            : undefined
                                    }
                                    type="date"
                                    placeholder="Select maximum date"
                                    className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                    )
                }

                {/* Checkbox Group Constraints */}
                {(currentElement.element.type === NextFormElementType.CHECKBOX_GROUP) && (
                    <>
                        <div className="mb-5">


                            <label className="block text-gray-700 text-sm font-medium mb-2">Min Selections:</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.minSelected || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    minSelected: Number(e.target.value),
                                    maxSelected :  Number(e.target.value) + 1
                                })}
                                className="w-full border-b-2 border-gray-300"
                                placeholder="Ex. 3"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Max Selections:</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.maxSelected || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    maxSelected:  Number(e.target.value) ,
                                })}
                                className="w-full border-b-2 border-gray-300"
                                placeholder="Ex. 4"
                            />
                        </div>
                    </>
                )}

                {/* Options Input (for select, radio, checkbox) */}
                {['checkbox_group', 'radio_group', 'select'].includes(currentElement.element.type.toLowerCase()) && (
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Options (comma-separated):</label>
                        <input
                            type="text"
                            value={currentElement.element.options || ''}
                            onChange={(e) => {
                                const options = e.target.value.trim().split(',').map((option) => option.trim());
                                handleChange('options', options)
                            }}
                            className="w-full border-b-2 border-gray-300"
                            placeholder="Enter options"
                        />
                    </div>
                )}




                {
                    currentElement.element.type == NextFormElementType.SHORT_ANSWER &&(
                        <>
                                <div className="mb-5 mt-5">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Maximum Chars:</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.maxLength || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    maxLength: Number(e.target.value),
                                })}
                                className="w-full border-b-2 border-gray-300"
                                placeholder="Exp. 5000"
                            />
                        </div>

                        </>
                    )
                }

                {currentElement.element.type == NextFormElementType.EMAIL && (<>
                    <div className="mb-5 flex items-center">
                        <input
                            type="checkbox"
                            checked={currentElement.element.constraints?.emailVerified || false}
                            onChange={(e) => handleChange('constraints', {
                                ...currentElement.element.constraints,
                                emailVerified: e.target.checked,
                            })}
                            className="mr-2 h-5 w-5"
                        />
                        <label className="text-gray-700 text-sm font-medium">Allow Only Verified Email</label>
                    </div>

                </>)}


                {/* all file constains */}
                {currentElement.element.type === NextFormElementType.FILE && (
                    <>

                        {/* for multiple selection */}
                        <div className="mb-5 flex items-center">
                            <input
                                type="checkbox"
                                checked={currentElement.element.constraints?.multiple || false}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    multiple: e.target.checked,
                                })}
                                className="mr-2 h-5 w-5"
                            />
                            <label className="text-gray-700 text-sm font-medium">Allow Multiple Files</label>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-md ">
                            <h2 className="text-lg font-medium text-gray-800 mb-3">Allowed File Types</h2>
                            <div className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                                {fileTypeList.map((fileType, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                currentElement.element.constraints?.fileTypes?.includes(fileType) || false
                                            }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleChange('constraints', {
                                                        ...currentElement.element.constraints,
                                                        fileTypes: [
                                                            ...(currentElement.element.constraints?.fileTypes || []),
                                                            fileType,
                                                        ],
                                                    });
                                                } else {
                                                    handleChange('constraints', {
                                                        ...currentElement.element.constraints,
                                                        fileTypes: currentElement.element.constraints?.fileTypes?.filter(
                                                            (type) => type !== fileType
                                                        ),
                                                    });
                                                }
                                            }}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                                        />
                                        <label className="text-gray-700 text-sm">{fileType}</label>
                                    </div>
                                ))}
                            </div>
                        </div>



                        <div className="mb-5 mt-5">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Minimum File Size (in bytes):</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.minSize || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    minSize: Number(e.target.value),
                                })}
                                className="w-full border-b-2 border-gray-300"
                                placeholder="Exp. 5000"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Maximum File Size (in bytes):</label>
                            <input
                                type="number"
                                value={currentElement.element.constraints?.maxSize || ''}
                                onChange={(e) => handleChange('constraints', {
                                    ...currentElement.element.constraints,
                                    maxSize: Number(e.target.value),
                                })}
                                className="w-full border-b-2 border-gray-300"
                                placeholder="Exp. 8000"
                            />
                        </div>
                    </>
                )}




                {/* {
                error && (<>
                    <Alert  type='error' title={error.title} message={error.message} />
                </>)
            } */}

                {/* Pattern Input */}




            </div>

        </>

    );
}

export default PropertyDefiner;
