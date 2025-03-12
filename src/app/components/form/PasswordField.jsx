'use client';
import { Controller, useFormContext } from 'react-hook-form';
import InputPassword from './InputPassword';
const PasswordField = ({ name, label, helperText, className, placeholder, }) => {
    const { control, formState: { errors }, } = useFormContext(); // Access form context
    return (<Controller name={name} control={control} render={({ field }) => {
            var _a, _b;
            return (<InputPassword {...field} id={name} label={label} error={(_a = errors[name]) === null || _a === void 0 ? void 0 : _a.message} // Display validation errors
             helperText={helperText} className={className} value={(_b = field.value) !== null && _b !== void 0 ? _b : ''} placeholder={placeholder}/>);
        }}/>);
};
export default PasswordField;
