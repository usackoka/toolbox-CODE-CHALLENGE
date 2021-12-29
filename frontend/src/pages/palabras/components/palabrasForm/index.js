import React from 'react';
import HookFormRender from '../../../../components/hook-form-render';
import { Col, Row } from 'react-bootstrap';
import validacionesPalabras from './../../validations/palabras.validations';
import { TextField } from '../../../../components/form';

const PalabrasForm = (props) => {

  const { onSubmit, defaultValues, buttons } = props;

  return (
    <>
      <HookFormRender onSubmit={onSubmit} validations={validacionesPalabras}>
        {() => {
          return (
            <>
              <Row className="mb-6 mt-6">
                <Col sm="6">
                  <TextField
                    name="text"
                    label="*Texto a analizar"
                    placeholder="Escribe el texto a analizar"
                    defaultValue={defaultValues?.text}
                  />
                </Col>
              </Row>
              {buttons}
            </>
          );
        }}
      </HookFormRender>
    </>
  );
};

export default PalabrasForm;
