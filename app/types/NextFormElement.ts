export enum NextFormElementType {
    URL = "url",
    SHORT_PARAGRAPH = "text",
    LONG_PARAGRAPH = "textarea",
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

export interface NextFormElement {
    name: string;
    type: NextFormElementType;
    label: string;
    dependsOn?: string;
    value?: string | string[]; // Single value for individual elements, array for grouped elements
    constraints?: {
        required?: boolean;
        min?: number;                // For numeric or date inputs (e.g., min value)
        max?: number;                // For numeric or date inputs (e.g., max value)
        minLength?: number;          // Minimum character length for text inputs
        maxLength?: number;          // Maximum character length for text inputs
        pattern?: string;            // Regex pattern for custom validation
        step?: number;               // For numeric inputs (e.g., step="0.01" for decimals)
        multiple?: boolean;          // For file inputs (allow multiple file selection)
        fileTypes?: string[];        // Allowed file types for file inputs (e.g., ['image/png', 'application/pdf'])
        minDate?: string;            // Minimum date for date inputs (e.g., "2024-01-01")
        maxDate?: string;            // Maximum date for date inputs (e.g., "2025-12-31")
        minTime?: string;            // Minimum time for time inputs (e.g., "09:00")
        maxTime?: string;            // Maximum time for time inputs (e.g., "18:00")
        minSize?: number;            // Minimum file size in bytes for file inputs
        maxSize?: number;            // Maximum file size in bytes for file inputs
        unique?: boolean;            // Ensures the value is unique (useful in databases)
        email?: boolean;             // Validates email format
        phone?: boolean;             // Validates phone number format
        alphaOnly?: boolean;         // Ensures only alphabetic characters
        alphanumeric?: boolean;      // Ensures only alphanumeric characters
        decimalPlaces?: number;      // Limits the number of decimal places for numeric inputs
        equalTo?: string;            // Ensures the value matches another field (useful for password confirmation)
        optionsLimit?: number;       // Maximum number of options to select (useful for checkboxes)
        disableFutureDates?: boolean; // Disallow future dates (useful for date of birth fields)
        minSelected?: number;        // For checkbox groups: minimum number of options to be selected
        maxSelected?: number;        // For checkbox groups: maximum number of options to be selected
    };
    options?: string[]; // For individual elements, or groups of checkboxes/radio buttons
    group?: {
        elements: NextFormElement[]; // For grouping radio buttons or checkboxes
        minSelected?: number;        // Minimum checkboxes to select in a group
        maxSelected?: number;        // Maximum checkboxes to select in a group
        required?: boolean;          // Makes the group selection mandatory
    };
}
