import Swal from 'sweetalert2';

interface Props {
  title: string;
  text: string;
  icon: 'warning' | 'error' | 'info' | 'success';
  confirmButton: string;
  htmlExtraAsString?: any;
}

const dialogConfirmacion = async ({
  title,
  text,
  icon,
  confirmButton,
  htmlExtraAsString
}: Props) => {
  const response = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: confirmButton,
    // reverseButtons: true, modificado por card 786
    html: htmlExtraAsString ? `${htmlExtraAsString}<p>${text}</p>` : undefined
  });
  return !!response.value;
};

const notificationAlert = async ({ title, text, icon, confirmButton }: Props) => {
  const response = await Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: confirmButton
  });
  return !!response.value;
};

const exp = {
  confirmacion: dialogConfirmacion,
  notificacion: notificationAlert
};

export default exp;
