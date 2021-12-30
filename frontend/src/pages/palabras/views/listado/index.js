import GenericContainer from '../../../../container/GenericContainer';
import Header from '../../../../partials/header/Header';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Plus } from 'react-feather';
import OptionButton from '../../../../components/OptionButton';
import Toolbar from '../../../../components/Toolbar';
import ActionsGrid from '../../../../components/grid/columns/actions';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux'
import { deletePalabra } from '../../../../redux/states/palabra.state';
import paths from '../../../../pages/palabras/paths';

const ListadoPalabras = (props) => {
  const palabraState = useSelector((store) => store.palabra);

  const history = useHistory();
  const dispatch = useDispatch();

  const actions = [
    {
      key: '0',
      icon: faTrash,
      style: 'btn-secondary',
      click: async (data) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'La eliminación de una palabra no se puede revertir',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deletePalabra({id: data.id}));
            Swal.fire('¡Eliminado!', 'La palabra ha sido eliminada.', 'success');
          }
        });
      }
    },
    {
      key: '1',
      icon: faEdit,
      style: 'btn-primary',
      click: async (data) => {
        history.push(`${paths.edit}?id=${data.id}`);
      }
    }
  ];

  const columnInfo = [
    {
      dataField: 'textOriginal',
      text: 'Texto original',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'text',
      text: 'Espejo',
      align: 'center',
      headerAlign: 'center'
    },
    {
      dataField: 'palindrome',
      text: 'Es palíndromo',
      align: 'center',
      formatter: (cell, row, rowIndex) => (
        <div className=" d-flex justify-content-end">{row?.palindrome ? 'Sí' : 'No'}</div>
      ),
      headerAlign: 'center'
    },
    {
      text: '',
      dataField: 'actions',
      formatter: (cell, row, rowIndex) => (
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
      <GenericContainer title="Palabras">
        <>
          <Toolbar
            className="mb-6"
            buttons={[
              <OptionButton
                Component={Plus}
                handleClick={() => {
                  history.push(paths.add);
                }}
                tooltipMessage="Registra nueva palabra"
              />
            ]}
          />
          {
            <BootstrapTable
              wrapperClasses="table-responsive"
              striped
              bordered={false}
              columns={columnInfo}
              data={palabraState.palabras}
              keyField="id"
            />
          }
        </>
      </GenericContainer>
    </>
  );
};

export default ListadoPalabras;
