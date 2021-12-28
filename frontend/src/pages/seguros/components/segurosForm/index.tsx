import React from 'react';
import HookFormRender from 'components/hook-form-render';
import { Col, Row } from 'react-bootstrap';
import { TextField, ComboBox } from 'components/form';
import { TiposVehiculos } from 'pages/seguros/types';
import validacionesSeguros from 'pages/seguros/validations/seguros.validations';
import FileManager from 'components/FileManager';
import CollapseForm from 'components/CollapseForm';

interface Props {
  onSubmit: (data: any, reset: any, e: any) => void;
  defaultValues?: any;
  buttons: any;
  isEdit?: boolean;
  readOnly?: boolean;
}

const SegurosForm = (props: Props) => {
  const { onSubmit, defaultValues, buttons, isEdit } = props;

  return (
    <>
      <HookFormRender onSubmit={onSubmit} validations={validacionesSeguros}>
        {() => {
          return (
            <>
              <Row className="mb-6 mt-6">
                <Col sm="6">
                  <TextField
                    name="name"
                    label="*Nombre Completo"
                    placeholder="Nombre completo"
                    defaultValue={defaultValues?.name}
                  />
                </Col>
                <Col sm="6">
                  <TextField
                    name="email"
                    label="*Correo Electrónico"
                    placeholder="Correo electrónico"
                    defaultValue={defaultValues?.email}
                  />
                </Col>
              </Row>
              <Row className="mb-6">
                <Col>
                  <TextField
                    name="phoneNumber"
                    label="Número de Teléfono"
                    placeholder="Número de teléfono"
                    defaultValue={defaultValues?.phoneNumber}
                  />
                </Col>
              </Row>
              <Row className="mb-6">
                <Col>
                  <TextField
                    name="licence"
                    label="*No Placa"
                    placeholder="Número de placa"
                    defaultValue={defaultValues?.licence}
                  />
                </Col>
              </Row>
              <Row className="mb-6">
                <Col>
                  <ComboBox
                    name="idVehicle"
                    label="*Tipo de Vehículo"
                    data={TiposVehiculos}
                    code="id"
                    display="name"
                    defaultValue={defaultValues?.idVehicle}
                    placeholder="Seleccione una opción"
                  />
                </Col>
              </Row>
              <CollapseForm display={!!isEdit} initialState={!!defaultValues?.brand}>
                <>
                  <Row className="mb-6">
                    <Col sm="6">
                      <TextField
                        name="brand"
                        label="Marca"
                        placeholder="Marca del vehículo"
                        defaultValue={defaultValues?.brand}
                      />
                    </Col>
                    <Col sm="6">
                      <TextField
                        name="model"
                        label="Modelo"
                        placeholder="Modelo del vehículo"
                        defaultValue={defaultValues?.model}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-6">
                    <Col sm="6">
                      <TextField
                        name="color"
                        label="Color"
                        placeholder="Color del vehículo"
                        defaultValue={defaultValues?.color}
                      />
                    </Col>
                    <Col sm="6">
                      <TextField
                        name="year"
                        label="Año"
                        placeholder="Año del vehículo"
                        defaultValue={defaultValues?.year}
                      />
                    </Col>
                    <Col sm="6">
                      <TextField
                        name="cc"
                        label="CC"
                        placeholder="CC del vehículo"
                        defaultValue={defaultValues?.cc}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-6">
                    <Col sm="6">
                      <TextField
                        name="chasis"
                        label="Chasis"
                        placeholder="Chasis del vehículo"
                        defaultValue={defaultValues?.chasis}
                      />
                    </Col>
                    <Col sm="6">
                      <TextField
                        name="vin"
                        label="VIN"
                        placeholder="VIN"
                        defaultValue={defaultValues?.vin}
                      />
                    </Col>
                    <Col sm="6">
                      <TextField
                        name="motor"
                        label="Motor"
                        placeholder="Motor del vehículo"
                        defaultValue={defaultValues?.motor}
                      />
                    </Col>
                  </Row>
                </>
              </CollapseForm>
              <Row className="col-12 text-center mb-6">
                <Col>
                  <FileManager
                    controlId="files"
                    values={defaultValues?.files}
                    name="files"
                    key="filesKey"
                    label="¡Sube tu tarjeta de circulación!"
                    extensions={['jpg', 'jpeg', 'gif', 'png']}
                    maxSizeInMB={20}
                    enabled={true}
                    limit={2}
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

export default SegurosForm;
