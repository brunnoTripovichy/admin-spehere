import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const Form = ({ children, onSubmit, defaultValues = {}, validationSchema, mode = 'onChange', }) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
        mode,
    });
    return (<FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4" role="form">
        {children}
      </form>
    </FormProvider>);
};
export default Form;
