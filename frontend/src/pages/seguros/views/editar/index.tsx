import GenericContainer from 'container/GenericContainer';
import React from 'react';
import SegurosForm from 'pages/seguros/components/segurosForm';
import Header from 'partials/header/Header';
import Swal from 'sweetalert2';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import { Col, Row } from 'react-bootstrap';
import { FormButton } from 'components/form';
import { useHistory } from 'react-router-dom';
import paths from 'pages/seguros/paths';
import emailjs from 'emailjs-com';
import apiKey from 'emailService/emailkey';

interface Props {}

const EditarSeguro = (props: Props) => {
  const history = useHistory();
  const [{ id }] = useQueryParams({
    id: withDefault(StringParam, undefined, false)
  });

  const fireBase = useFirestore().collection('seguros');
  const seguro = fireBase.doc(id ?? '');
  const { status: statusData, data } = useFirestoreDocData(seguro);

  if (!id) {
    return <>Bad request</>;
  }
  if (id && statusData === 'loading') {
    return <>Loading</>;
  }

  const onSubmit = async (data: any, reset: any, e: any) => {
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

    let title = 'Solicitud editada con éxito';

    if (e.nativeEvent.submitter.name === 'btnCotizacion') {
      Toast.fire({
        icon: 'info',
        title: 'Enviando cotización'
      });
      await emailjs.send(
        apiKey.SERVICE_SMTP,
        apiKey.TEMPLATE_COTIZACION_ID,
        { ...data, vehicleName: data.idVehicle.name, pricePerMonth: data.idVehicle.pricePerMonth },
        apiKey.USER_ID
      );
      title = 'Se envió un email al cliente con la cotización';
    } else {
      Toast.fire({
        icon: 'info',
        title: 'Editando solicitud'
      });
    }
    await fireBase.doc(id).update(data);

    Toast.close();
    Toast.fire({
      icon: 'success',
      title
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
        <FormButton
          name="btnCotizacion"
          className="primary"
          text="Enviar cotización"
          type="submit"
        />
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
        title="Editar Cotización"
        subtitle="Ingresa los siguientes datos para solicitar el seguro de tu vehículo"
      >
        <SegurosForm isEdit onSubmit={onSubmit} defaultValues={data} buttons={Buttons} />
      </GenericContainer>
    </>
  );
};

export default EditarSeguro;
