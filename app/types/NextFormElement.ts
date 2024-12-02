export enum NextFormElementType {
    URL = "url",
    SHORT_ANSWER = "text",
    PARAGRAPH = "textarea",
    FILE = "file",
    PASSWORD = "password",
    EMAIL = "email",
    DATE = "date",
    TIME = "time",
    SELECT = "select",
    NUMBER = "number",
    CHECKBOX_GROUP = "checkbox_group",
    RADIO_GROUP = "radio_group",
}


export interface NextFormConstraints {

    required?: boolean;
    min?: number;                // For numeric or date inputs (e.g., min value)
    max?: number;                // For numeric or date inputs (e.g., max value)
    minLength?: number;          // Minimum character length for text inputs
    maxLength?: number;          // Maximum character length for text inputs
    pattern?: string;            // Regex pattern for custom validation
    multiple?: boolean;          // For file inputs (allow multiple file selection)
    fileTypes?: string[];        // Allowed file types for file inputs (e.g., ['image/png', 'application/pdf'])
    minSize?: number;            // Minimum file size in bytes for file inputs
    maxSize?: number;            // Maximum file size in bytes for file inputs
    emailVerified?: boolean;             // Validates email format
    phoneVerified?: boolean;             // Validates phone number format
    disableFutureDates?: boolean; // Disallow future dates (useful for date of birth fields)
    minSelected?: number;        // For checkbox groups: minimum number of options to be selected
    maxSelected?: number;        // For checkbox groups: maximum number of options to be selected
}

export interface NextFormElement {
    elementId : number;
    name: string;
    type: NextFormElementType;
    label: string;
    dependsOn?: string;
    files?: File[]; // For file inputs
    value?: string | string[]; // Single value for individual elements, array for grouped elements
    constraints?: NextFormConstraints;
    options?: string[]; // For individual elements, or groups of checkboxes/radio buttons
    group?: {
        elements: NextFormElement[]; // For grouping radio buttons or checkboxes
        minSelected?: number;        // Minimum checkboxes to select in a group
        maxSelected?: number;        // Maximum checkboxes to select in a group
        required?: boolean;          // Makes the group selection mandatory
    };
}
