import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

const TextField = (props: Props) => {
  const { name, disabled, defaultValue, readOnly, placeholder, label } = props;
  const methods = useFormContext();
  const error = methods?.errors[name];

  return (
    <>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          defaultValue={defaultValue}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          isInvalid={error}
          placeholder={placeholder}
          autoComplete={'off'}
          ref={methods?.register}
        />
        <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default TextField;
