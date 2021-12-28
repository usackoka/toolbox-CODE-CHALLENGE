import * as yup from 'yup';

const validacionesSeguros = yup.object().shape({
  idVehicle: yup
    .object()
    .required('Debe seleccionar un tipo de vehículo')
    .typeError('Debe seleccionar un tipo de vehículo'),
  name: yup.string().required('Debe ingresar su nombre'),
  licence: yup.string().required('Debe ingresar su número de placa'),
  phoneNumber: yup.string().optional(),
  email: yup
    .string()
    .email('El formato de email no coincide')
    .required('Debe ingresar su correo electrónico')
});

export default validacionesSeguros;
