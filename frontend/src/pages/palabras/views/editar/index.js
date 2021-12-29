import GenericContainer from '../../../../container/GenericContainer';
import React from 'react';
import Header from '../../../../partials/header/Header';
import Swal from 'sweetalert2';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import { Col, Row } from 'react-bootstrap';
import { FormButton } from '../../../../components/form';
import { useHistory } from 'react-router-dom';
import paths from '../../../../pages/palabras/paths';
import PalabrasForm from '../../components/palabrasForm';

const EditarPalabra = (props) => {
  const history = useHistory();
  const [{ id }] = useQueryParams({
    id: withDefault(StringParam, undefined, false)
  });

  if (!id) {
    return <>Bad request</>;
  }
  
  const onSubmit = async (data, reset, e) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'info',
      title: 'Editando solicitud'
    });
    Toast.close();
    Toast.fire({
      icon: 'success',
      title: 'Solicitud editada'
    });

    history.push(paths.list);
  };

  const Buttons = (
    <Row className="text-center mb-6">
      <Col>
        <FormButton
          className="dark"
          text="Cancelar"
          type="button"
          onClick={() => {
            history.goBack();
          }}
        />
      </Col>
      <Col>
        <FormButton name="btnCotizacion" className="primary" text="Enviar palabra" type="submit" />
      </Col>
      <Col>
        <FormButton name="btnModificar" className="primary" text="Modificar" type="submit" />
      </Col>
    </Row>
  );

  return (
    <>
      <Header />
      <GenericContainer
        title="Editar Palabra"
        subtitle="Ingresa los siguientes datos para analizar tu palabra"
      >
        <PalabrasForm isEdit onSubmit={onSubmit} defaultValues={{}} buttons={Buttons} />
      </GenericContainer>
    </>
  );
};

export default EditarPalabra;
