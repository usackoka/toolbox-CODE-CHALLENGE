import GenericContainer from 'container/GenericContainer';
import React from 'react';
import SegurosForm from 'pages/seguros/components/segurosForm';
import Header from 'partials/header/Header';
import Swal from 'sweetalert2';
import { useFirestore } from 'reactfire';
import { Col, Row } from 'react-bootstrap';
import { FormButton } from 'components/form';
import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com';
import apiKey from 'emailService/emailkey';
import paths from 'pages/seguros/paths';

interface Props {}

const CrearSeguro = (props: Props) => {
  const history = useHistory();
  const fireBase = useFirestore().collection('seguros');

  const onSubmit = async (data: any, e: any) => {
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
      title: 'Guardando solicitud'
    });
    const doc = await fireBase.add(data);
    Toast.close();

    //email para el cliente
    data.message =
      'Gracias, hemos recibido tu solicitud, pronto enviaremos tu cotización a los datos de contacto ingresados.';
    data.buttonText = 'Realizar otra cotización';
    data.buttonRedirect = 'https://soat.gt';
    data.userEmail = data.email;
    await emailjs.send(
      apiKey.SERVICE_SMTP,
      apiKey.TEMPLATE_NOTIFICACION_ID,
      { ...data, vehicleName: data.idVehicle.name, pricePerMonth: data.idVehicle.pricePerMonth },
      apiKey.USER_ID
    );

    //email para el administrador
    data.userEmail = data.email;
    data.email = 'developers@webtrackgps.net';
    data.message = `${data.name} ha solicitado una cotización de seguro con la siguiente información`;
    data.buttonText = 'Ver solicitud';
    data.buttonRedirect = `https://soat.gt${paths.edit}?id=${doc.id}`;
    data.bccTo = `oscar@webtrackgps.net, fluna@webtrackgps.net, ricardo@webtrackgps.net`;
    data.files.forEach((item: any) => {
      data.imgsSources = item.fileUrl;
      data.imgsNames = item.name;
    });
    await emailjs.send(
      apiKey.SERVICE_SMTP,
      apiKey.TEMPLATE_NOTIFICACION_ID,
      { ...data, vehicleName: data.idVehicle.name, pricePerMonth: data.idVehicle.pricePerMonth },
      apiKey.USER_ID
    );

    Toast.fire({
      icon: 'success',
      title: 'Solicitud guardada con éxito.'
    });
    // history.push(paths.list);
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
        title="Solicitar Cotización"
        subtitle="Ingresa los siguientes datos para solicitar el seguro de tu vehículo"
      >
        <SegurosForm onSubmit={onSubmit} buttons={Buttons} />
      </GenericContainer>
    </>
  );
};

export default CrearSeguro;
