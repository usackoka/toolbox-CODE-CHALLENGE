import * as yup from 'yup';

const validacionesPalabras = yup.object().shape({
  text: yup.string().required('Debe ingresar un texto')
});

export default validacionesPalabras;
