'use client';

import { Controller, useFormContext } from 'react-hook-form';
import InputText from './InputText';

interface TextFieldProps {
  name: string;
  label: string;
  helperText?: string;
  className?: string;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  helperText,
  className,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Access form context

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputText
          {...field}
          id={name}
          label={label}
          error={errors[name]?.message as string} // Display validation errors
          helperText={helperText}
          className={className}
          value={field.value ?? ''}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default TextField;
