import GenericContainer from '../../../../container/GenericContainer';
import React from 'react';
import Header from '../../../../partials/header/Header';
import Swal from 'sweetalert2';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FormButton } from '../../../../components/form';
import PalabrasForm from '../../components/palabrasForm';
import paths from '../../paths'
import { getAnalisys } from '../../../../services/palabras'
import { useDispatch } from 'react-redux'
import { createPalabra } from '../../../../redux/states/palabra.state';
import { v4 } from 'uuid';

const CrearPalabra = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

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

    const response = await getAnalisys(data.text);

    if (response.error) { 
      Toast.fire({
        icon: 'error',
        title: 'Ocurrió un error al analizar la palabra.'
      });
      return ;
    }

    Toast.fire({
      icon: 'success',
      title: 'Palabra analizada...'
    });

    dispatch(createPalabra({ ...response, id: v4() }))
    
    history.push(paths.list);
  };

  const Buttons = (
    <Row className="col-12 text-center mb-6">
      <Col>
        <FormButton
          className="secondary"
          text="Cancelar / Regresar"
          type="button"
          onClick={() => {
            history.push(paths.list);
          }}
        />
      </Col>
      <Col>
        <FormButton className="primary" text="Analizar" type="submit" />
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
