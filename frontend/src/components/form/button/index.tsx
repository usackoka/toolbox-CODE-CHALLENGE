import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  disabled?: boolean;
  className?: string;
  onClick?: any;
  text?: string;
  type?: any;
  name?: string;
  formName?: string;
}

const FormButton = (props: Props) => {
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
