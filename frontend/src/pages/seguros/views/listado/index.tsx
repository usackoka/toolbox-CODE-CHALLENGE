import GenericContainer from 'container/GenericContainer';
import Header from 'partials/header/Header';
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useFirestore } from 'reactfire';
import { Plus } from 'react-feather';
import OptionButton from 'components/OptionButton';
import Toolbar from 'components/Toolbar';
import ActionsGrid, { ActionColumn } from 'components/grid/columns/actions';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import paths from 'pages/seguros/paths';

interface Props {}

const ListadoSeguros = (props: Props) => {
  const [data, setData] = useState<any>();
  const history = useHistory();
  const fireBase = useFirestore().collection('seguros');

  useEffect(() => {
    const getAll = async () => {
      fireBase.onSnapshot((snapshot: any) => {
        const postData: any = [];
        snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
        setData(postData);
      });
    };

    getAll();
  }, []);

  const actions: ActionColumn[] = [
    {
      key: '0',
      icon: faTrash,
      style: 'btn-secondary',
      click: async (data: any) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'La eliminación de una solicitud no se puede revertir!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            fireBase.doc(data?.id).delete();
            Swal.fire('¡Eliminada!', 'La solicitud ha sido eliminada.', 'success');
          }
        });
      }
    },
    {
      key: '1',
      icon: faEdit,
      style: 'btn-primary',
      click: async (data: any) => {
        history.push(`${paths.edit}?id=${data.id}`);
      }
    }
  ];

  const columnInfo = [
    {
      dataField: 'name',
      text: 'Nombre Completo',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'email',
      text: 'Correo Electrónico',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'licence',
      text: 'No. Placa',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'phoneNumber',
      text: 'Número de Teléfono',
      align: 'center',
      headerAlign: 'center'
    },
    {
      text: '',
      dataField: 'actions',
      formatter: (cell: any, row: any, rowIndex: any) => (
        <div className=" d-flex justify-content-end">
          <ActionsGrid prefix="tab" actions={actions} rowIndex={rowIndex} data={row} />
        </div>
      ),
      align: 'center',
      headerAlign: 'center'
    }
  ];

  return (
    <>
      <Header />
      <GenericContainer title="Seguros">
        <>
          <Toolbar
            className="mb-6"
            buttons={[
              <OptionButton
                Component={Plus}
                handleClick={() => {
                  history.push(paths.add);
                }}
                tooltipMessage="Registra nueva cotización"
              />
            ]}
          />
          {data && (
            <BootstrapTable
              wrapperClasses="table-responsive"
              striped
              bordered={false}
              columns={columnInfo}
              data={data}
              keyField="id"
            />
          )}
        </>
      </GenericContainer>
    </>
  );
};

export default ListadoSeguros;
