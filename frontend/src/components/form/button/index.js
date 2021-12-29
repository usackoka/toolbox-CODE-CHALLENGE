import React from 'react';
import { Button } from 'react-bootstrap';

const FormButton = (props) => {
  const { disabled, className, onClick, text, type, name, formName } = props;
  return (
    <Button
      name={name}
      type={type ?? 'button'}
      disabled={disabled}
      form={formName}
      className={`${className} btn btn-${className} btn-hover-secondary`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default FormButton;
