import React, { useState, useEffect } from 'react';

export interface AlertProps {
    type: 'error' | 'success' | 'warning' | 'info';
    title: string;
    message: string;
}

function Alert({ type, title, message }: AlertProps): React.ReactElement  {
    const alertClasses = {
        error: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600',
    };
    const alertTypeClass = alertClasses[type];

    return (
        <div className={`p-4 mb-4 rounded ${alertTypeClass}`}>
        <h3 className="font-semibold">{title}</h3>
        <p>{message}</p>
    </div>
    );
}

export default Alert;
