export interface Element {
    elementType: string;
    elementConfig: {
        type?: string;
        placeholder?: string;
        options?: { value: string; displayValue: string }[];
    };
    value: string;
    validation: {
        required?: boolean;
        isEmail?: boolean;
        minLength?: number;
        maxLength?: number;
    },
    valid: boolean;
    touched?: boolean;
}


export interface Form{
    [key: string]: Element;
}