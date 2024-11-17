export enum NextFormElementType {
    URL = "url",
    SHORT_PARAGRAPH = "text",
    LONG_PARAGRAPH = "textarea",
    NUMBER = "number",
    FILE = "file",
    DATE = "date",
    TIME = "time",
    DATETIME = "datetime",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    SELECT = "select",

}
export interface NextFormElement {
    name: string,
    type:NextFormElementType,
    label: string,
    dependsOn?: string,
    value?:string,
    constraints?: {
        required?: boolean,
        min?: number,
        max?: number,
        pattern?: string,
    }
    options?: string[]

}


