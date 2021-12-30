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
import { useSelector, useDispatch } from 'react-redux';
import { getAnalisys } from '../../../../services/palabras';
import { modifyPalabra } from '../../../../redux/states/palabra.state';

const EditarPalabra = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [{ id }] = useQueryParams({
    id: withDefault(StringParam, undefined, false)
  });

  const palabras = useSelector((store) => store.palabra.palabras);
  const palabra = palabras.find((x) => x.id === id);
  const data = { ...palabra, text: palabra.textOriginal };

  if (!id || id==='undefined') {
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

    const response = await getAnalisys(data.text);

    Toast.close();

    Toast.fire({
      icon: 'success',
      title: 'Palabra editada'
    });

    dispatch(modifyPalabra({...response, id }));
    history.push(paths.list);
  };

  const Buttons = (
    <Row className="text-center mb-6">
      <Col>
        <FormButton
          className="dark"
          text="Cancelar / Regresar"
          type="button"
          onClick={() => {
            history.goBack();
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
        title="Editar Palabra"
        subtitle="Ingresa los siguientes datos para analizar tu palabra"
      >
        <PalabrasForm isEdit onSubmit={onSubmit} defaultValues={data} buttons={Buttons} />
      </GenericContainer>
    </>
  );
};

export default EditarPalabra;
