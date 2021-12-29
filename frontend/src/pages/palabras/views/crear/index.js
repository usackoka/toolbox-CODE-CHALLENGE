import GenericContainer from 'container/GenericContainer';
import React from 'react';
import Header from 'partials/header/Header';
import Swal from 'sweetalert2';
import { Col, Row } from 'react-bootstrap';
import { FormButton } from 'components/form';
import { useHistory } from 'react-router-dom';
import PalabrasForm from 'pages/palabras/components/segurosForm';

const CrearPalabra = (props) => {
  const history = useHistory();

  const onSubmit = async (data, e) => {
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
      title: 'Analizando palabra'
    });
    Toast.close();

    Toast.fire({
      icon: 'success',
      title: 'Palabra analizada con éxito.'
    });
  };

  const Buttons = (
    <Row className="col-12 text-center mb-6">
      <Col>
        <FormButton
          className="secondary"
          text="Cancelar"
          type="button"
          onClick={() => {
            history.goBack();
          }}
        />
      </Col>
      <Col>
        <FormButton className="primary" text="Cotizar" type="submit" />
      </Col>
    </Row>
  );

  return (
    <>
      <Header />
      <GenericContainer
        title="Solicitar Palabra"
        subtitle="Ingresa los siguientes datos para analizar la palabra"
      >
        <PalabrasForm onSubmit={onSubmit} buttons={Buttons} />
      </GenericContainer>
    </>
  );
};

export default CrearPalabra;
