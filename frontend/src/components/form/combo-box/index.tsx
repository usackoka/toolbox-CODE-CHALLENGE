import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  code: string;
  display: string;
  data: any[];
  defaultValue?: any;
  disabled?: any;
  onSelected?: any;
  loading?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

const ComboBox = (props: Props) => {
  const { errors, setValue, getValues, control } = useFormContext();
  const {
    label,
    name,
    code,
    display,
    data,
    defaultValue,
    disabled,
    onSelected,
    loading,
    readOnly,
    placeholder
  } = props;
  const error = errors[name];

  const [thisDefault, setDefault] = useState(undefined);

  useEffect(() => {
    const selected = data?.find((x) => defaultValue && x[code] === defaultValue[code]);
    if (onSelected && selected) {
      onSelected(selected, setValue, getValues);
    }
    setDefault(selected);
    setValue(name, selected);
  }, []);

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <Controller
          control={control}
          name={name}
          isInvalid={error}
          defaultValue={thisDefault}
          render={({ onChange, onBlur, value }) => (
            <Select
              menuPortalTarget={document.getElementById('portal-target')}
              styles={{ menuPortal: (styles) => ({ ...styles, zIndex: 91000 }) }}
              menuIsOpen={readOnly ? false : undefined}
              isSearchable={!readOnly}
              isClearable={!readOnly}
              isDisabled={disabled ? disabled(getValues) : false}
              defaultValue={thisDefault}
              isInvalid={error}
              name={name}
              value={value}
              options={data}
              noOptionsMessage={() => 'Ningún resultado'}
              getOptionValue={(item) => item[code]}
              getOptionLabel={(item) => item[display]}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(e);
                if (onSelected) {
                  onSelected(e, setValue, getValues);
                }
              }}
            />
          )}
        />
      )}
      <Form.Control.Feedback
        style={{
          display: 'block'
        }}
        type="invalid"
      >
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ComboBox;
