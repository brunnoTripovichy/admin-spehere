'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from './Checkbox';

interface CheckboxFieldProps {
  name: string;
  label: string;
  helperText?: string;
  className?: string;
}

/**
 * CheckboxField component that integrates with React Hook Form
 * Uses the base Checkbox component
 */
const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  helperText,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          id={name}
          checked={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          label={label}
          error={errors[name]?.message as string}
          helperText={helperText}
          className={className}
        />
      )}
    />
  );
};

export default CheckboxField;
