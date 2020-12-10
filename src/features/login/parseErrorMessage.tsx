import React from 'react';

export function parseErrorMessage(data: { [x: string]: string[]; }) {

    let error_message: string[] = [];

    Object.keys(data).map((key) => {
        let message;
        let field: string = key;
        if (field === 'non_field_errors')
            message = data[key][0].slice(0, -1);
        else {
            message = removeSymbol(capitalize(field)) + ": " + uncapitalize(data[key][0]).slice(0, -1);
        }
        error_message.push(message);
    })
    return (error_message);
}

const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const uncapitalize = (text: string) => {
    return text.charAt(0).toLowerCase() + text.slice(1);
}

const removeSymbol = (text: string) => {
    return text.replace('_', ' ');
}

export const renderErrorMessage = (error_message: string[]) => {
    return (error_message.map((error, i) =>
        <div key={i}>{error}</div>))
}