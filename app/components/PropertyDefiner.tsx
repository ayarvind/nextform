import { useNextFormContext } from '~/context/useNextFormContext';
import { useNextFormPropsDefiner } from '~/context/useNextFormPropsDefiner';
import { NextFormElementType } from '~/types/NextFormElement';

function PropertyDefiner() {
    const { currentElement, setCurrentElement } = useNextFormPropsDefiner();
    const { nextFormElements, setNextFormElements } = useNextFormContext();

    const handleChange = (field: string, value: any) => {
        if (!currentElement) return;

        const index = currentElement.index;

        // Update the specific form element in the context array
        setNextFormElements((prev) => {
            const newElements = [...prev];
            newElements[index] = {
                ...newElements[index],
                [field]: value,
            };
            return newElements;
        });

        // Also update the currentElement for immediate effect
        setCurrentElement({
            ...currentElement,
            element: {
                ...currentElement.element,
                [field]: value,
            },
        });
    };

    console.log(currentElement)

    if (!currentElement) {
        return (
            <div className='p-5 m-auto flex flex-col justify-center items-center'>
                <img src='/icons/empty.webp' alt="Empty" className="w-1/2 mx-auto" />
                <h1 className='text-center text-lg font-medium text-gray-600'>
                    Create a new element or select an existing element to edit its properties
                </h1>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg  w-full max-w-2xl mx-auto">
            <div className="flex justify-start gap-4">
                <div className="badges  bg-black text-white text-center w-9 h-9 flex justify-center items-center ">
                    {currentElement.index + 1}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Define Element Properties</h2>

            </div>

            {/* Name Input */}
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Name:</label>
                <input
                    type="text"
                    value={currentElement.element.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full p-3 border-b-2 border-gray-300 rounded-md  "
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
                    className="w-full p-3 border-b-2 border-gray-300 rounded-md  "
                    placeholder="Enter label for the element"
                />
            </div>

            {/* Type Selector */}
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Type:</label>
                <select
                    value={currentElement.element.type || ''}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full p-3 border-b-2 border-gray-300 rounded-md  "
                >
                    {
                        Object.keys(NextFormElementType).map((key) => {
                            const parseKey = key.replace('_', ' ').toUpperCase();
                            return <option key={key} value={key}>{parseKey}</option>
                        })
                    }
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
                    className="mr-2 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="text-gray-700 text-sm font-medium">Required</label>
            </div>

            {/* Min and Max Constraints (Only for number type) */}
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
                            className="w-full p-3 border border-gray-300 rounded-md  "
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
                            className="w-full p-3 border border-gray-300 rounded-md  "
                        />
                    </div>
                </>
            )}

            {/* Pattern Constraint (Only for text types) */}
            {currentElement.element.type === NextFormElementType.SHORT_PARAGRAPH && (
                <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Pattern (Regex):</label>
                    <input
                        type="text"
                        value={currentElement.element.constraints?.pattern || ''}
                        onChange={(e) => handleChange('constraints', {
                            ...currentElement.element.constraints,
                            pattern: e.target.value,
                        })}
                        className="w-full p-3 border-b-2 border-gray-300 rounded-md shadow-sm "
                        placeholder="Enter regex pattern"
                    />
                </div>
            )}
        </div>
    );
}

export default PropertyDefiner;
