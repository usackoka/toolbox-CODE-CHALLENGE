/* eslint-disable react/require-default-props */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Form } from 'react-bootstrap';
import { FormProvider, useForm, UseFormMethods } from 'react-hook-form';

interface Props {
  onSubmit: Function;
  validations?: any;
  children?: any;
  initialValues?: any;
  nameForm?: string;
  onChange?: any;
  reference?: any;
  className?: any;
}

export type HookFormMethods = UseFormMethods<any>;

function HookFormRender({
  validations,
  initialValues,
  onSubmit,
  nameForm,
  children,
  onChange,
  reference,
  className
}: Props) {
  const methods = useForm({
    resolver: validations ? yupResolver(validations) : undefined,
    defaultValues: initialValues || {}
  });

  const submit = (data: any, event: any) => (onSubmit ? onSubmit(data, methods.reset, event) : '');

  const childrenProps: HookFormMethods = {
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
