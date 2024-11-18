import { useNextFormContext } from '~/context/useNextFormContext';
import { useNextFormPropsDefiner } from '~/context/useNextFormPropsDefiner';
import { NextFormElementType } from '~/types/NextFormElement';

function PropertyDefiner() {
    const { currentElement, setCurrentElement } = useNextFormPropsDefiner();
    const { nextFormElements, setNextFormElements } = useNextFormContext();

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
        <div className="p-6 bg-white rounded-lg w-full max-w-2xl mx-auto">
            <div className="flex justify-start gap-4 mb-4">
                <div className="badges bg-black text-white text-center w-9 h-9 flex justify-center items-center">
                    {currentElement.index + 1}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Define Element Properties</h2>
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
                    value={currentElement.element.type || NextFormElementType.SHORT_PARAGRAPH}
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
                            })}
                            className="w-full border-b-2 border-gray-300"
                            placeholder="Minimum number of checkboxes to select"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Max Selections:</label>
                        <input
                            type="number"
                            value={currentElement.element.constraints?.maxSelected || ''}
                            onChange={(e) => handleChange('constraints', {
                                ...currentElement.element.constraints,
                                maxSelected: Number(e.target.value),
                            })}
                            className="w-full border-b-2 border-gray-300"
                            placeholder="Maximum number of checkboxes to select"
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
                        placeholder="Enter options, separated by commas"
                    />
                </div>
            )}
        </div>
    );
}

export default PropertyDefiner;
