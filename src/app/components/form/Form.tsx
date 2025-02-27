import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  validationSchema: yup.ObjectSchema<any>; // Pass validation rules
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'all' | 'onTouched';
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  defaultValues = {},
  validationSchema,
  mode = 'onChange',
}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
