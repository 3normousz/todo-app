import React from 'react';

export default function InputField({ label, type, placeholder, refProp, required }) {
    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={type}
                placeholder={placeholder}
                ref={refProp}
                required={required}
            />
        </>
    );
}
