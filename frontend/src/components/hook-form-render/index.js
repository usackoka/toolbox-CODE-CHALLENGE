/* eslint-disable react/require-default-props */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Form } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

function HookFormRender({
  validations,
  initialValues,
  onSubmit,
  nameForm,
  children,
  onChange,
  reference,
  className
}) {
  const methods = useForm({
    resolver: validations ? yupResolver(validations) : undefined,
    defaultValues: initialValues || {}
  });

  const submit = (data, event) => (onSubmit ? onSubmit(data, methods.reset, event) : '');

  const childrenProps = {
    ...methods
  };
  return (
    <FormProvider {...methods}>
      <Form
        className={className}
        ref={reference}
        onChange={onChange}
        noValidate
        autoComplete="off"
        id={nameForm}
        onSubmit={methods.handleSubmit((d, e) => submit(d, e))}
      >
        {children(childrenProps)}
      </Form>
    </FormProvider>
  );
}

export default HookFormRender;
