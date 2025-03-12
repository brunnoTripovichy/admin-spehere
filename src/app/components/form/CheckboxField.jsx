'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from './Checkbox';
/**
 * CheckboxField component that integrates with React Hook Form
 * Uses the base Checkbox component
 */
const CheckboxField = ({ name, label, helperText, className, }) => {
    const { control, formState: { errors }, } = useFormContext();
    return (<Controller name={name} control={control} render={({ field }) => {
            var _a;
            return (<Checkbox id={name} checked={field.value} onChange={field.onChange} onBlur={field.onBlur} label={label} error={(_a = errors[name]) === null || _a === void 0 ? void 0 : _a.message} helperText={helperText} className={className}/>);
        }}/>);
};
export default CheckboxField;
