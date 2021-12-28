import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import {
  faCloudUploadAlt,
  faTimesCircle,
  faDownload,
  faPaperclip,
  faCamera,
  faTimesCircle as farTimesCircle,
  faFile as farFile
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';
import Styles from './car.module.scss';
import { DownloadFile } from '../fileDownload';
import DialogoService from 'services/dialogo.service';
import { useFirestore } from 'reactfire';
import { firebaseApp } from 'firebase/config';

const Empty = () => {
  return <></>;
};

const MyFiles = (props) => {
  const { myFiles, soloDescarga, confirmRemoveFile } = props;

  if (myFiles?.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <div className="d-flex flex-lg-row flex-md-row flex-wrap justify-content-start flex-xs-column">
        {myFiles.map((row) => (
          <Alert
            variant={row.status === 'initial' ? 'secondary' : 'light'}
            className={`${Styles.file} ${Styles.fileMinView} ${Styles.fileMaxView} d-flex justify-content-start col-xs-12 mr-2 mb-2 mt-2 sm-12`}
          >
            <div className="d-flex w-100">
              <div className={`${Styles.fileName} d-flex ml-1 mr-1`}>
                {row.status !== 'error' && (
                  <FontAwesomeIcon
                    icon={farFile}
                    className={`${Styles.accionMin} ${Styles.accionBlue}`}
                  />
                )}
                <span className="text-truncate" id="file-name-str">
                  {row.id ? row.nombre : row.name}
                </span>
                {row.status && row.status === 'error' && (
                  <span>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className={`ml-auto ${Styles.accionMin} ${Styles.accionRed}`}
                    />{' '}
                    error al cargar documento
                  </span>
                )}
                {row.status && row.status === 'initial' && (
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className={`ml-auto ${Styles.accionMax} ${Styles.accionGray}`}
                  />
                )}
              </div>
              <div className={`ml-auto d-flex justify-content-end ${Styles.fileActions}`}>
                {row.status === 'initial' && (
                  <Spinner
                    animation="grow"
                    className={` ${Styles.accionMin}  ${Styles.accionBlue} `}
                  />
                )}
                {((row.status && row.status === 'loaded') || row.id !== undefined) && (
                  <div>
                    <DownloadFile
                      fileUrl={row.fileUrl}
                      metaData={row}
                      service={props.service}
                      element={
                        <Button variant="outline-primary" size="sm" className="m-1">
                          <FontAwesomeIcon icon={faDownload} />
                        </Button>
                      }
                    />
                  </div>
                )}

                {!soloDescarga &&
                  (row.status === 'loaded' ||
                    row.id !== undefined ||
                    (row.status && row.status === 'error')) &&
                  props.enabled && (
                    <div>
                      <Button
                        onClick={() => confirmRemoveFile(row)}
                        variant="outline-danger"
                        size="sm"
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={farTimesCircle} />
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </>
  );
};

const LabelFiles = (props) => {
  const { soloDescarga } = props;
  if (soloDescarga) {
    return <strong>Documentos</strong>;
  }
  return (
    <>
      <label
        htmlFor="fileControl"
        className={`btn btn-outline-${
          !props.enabled || (props.limit && props.myFiles.length === props.limit)
            ? 'dark'
            : 'primary'
        } mr-auto`}
      >
        <FontAwesomeIcon className="mr-2" icon={faCamera} />
        {props?.label ?? 'Subir documentos'}
      </label>
    </>
  );
};

function FileManager(props) {
  const fireBase = useFirestore().collection('files');
  const methods = useFormContext();
  const { setValue, register, errors, clearErrors, getValues } = methods;

  const { label, soloDescarga, name } = props;
  const [myFiles, setfiles] = useState(props.values ?? (getValues(name) || []));
  const [status, setStatus] = useState('');
  const extensionsRegs = props.extensions?.map((x) => new RegExp(`\\.${x}$`));
  register({ name });

  const error = errors ? errors[name] : undefined;

  const onChange = async (e) => {
    const { files } = e.target;
    let filesArr = Array.prototype.slice.call(files).map((x) => {
      x.status = 'initial';
      return x;
    });

    // filter extensions
    if (props.extensions && props.extensions.length > 0) {
      filesArr = filesArr.filter((x) => {
        const valid = extensionsRegs?.map((r) => r.test(x.name));
        return valid.includes(true);
      });
      // si difiere la cantidad de archivos entonces algunos no son validos
      if (files.length !== filesArr.length) {
        await showInfoExtensions();
      }
    }

    var filesize = '';
    // filter size
    if (props.maxSizeInMB && filesArr.length > 0) {
      let count = filesArr.length;

      const filesOverMB: any[] = [];
      filesArr = filesArr.filter((x: any) => {
        const isUnder = x.size < props.maxSizeInMB * 1048576;
        if (!isUnder) {
          filesOverMB.push(x.name);
        }

        var _size = x.size;
        var fSExt = ['Bytes', 'KB', 'MB', 'GB'],
          i = 0;
        while (_size > 900) {
          _size /= 1024;
          i++;
        }
        filesize = Math.round(_size * 100) / 100 + ' ' + fSExt[i];

        return isUnder;
      });

      count -= filesArr.length;

      if (count > 0) {
        await showInfoOverMB(filesOverMB);
      }
    }
    // validar limite
    if (props.limit && props.limit < filesArr.length + myFiles.length) {
      await showInfoOverLimit();
      filesArr = [];
    }

    // si aún existen archivos que pasaron filtros
    if (filesArr.length > 0) {
      setfiles([...myFiles, ...filesArr]);
      await new Promise((r) => setTimeout(r, 50));
      setStatus('loading');
      const newArr: any[] = [];

      for (let elem of filesArr) {
        const elemTemp = await upload(elem, props.service);
        elemTemp.size = filesize;
        newArr.push(elemTemp);
      }

      setfiles([...myFiles, ...newArr]);
      setStatus('finished');
    }
  };

  const showInfoExtensions = async () => {
    await DialogoService.notificacion({
      icon: 'info',
      text: `Algunos archivos no cumplen con la extensión ${props.extensions.map(
        (x) => ` ${x}`
      )} y no se agregarán a la lista`,
      confirmButton: 'Entiendo',
      title: '¡Atención!'
    });
  };

  const showInfoOverMB = async (files) => {
    await DialogoService.notificacion({
      icon: 'info',
      text: `El/los archivo(s) ${files.map((x) => ` ${x}`)} superan el tamaño permitido de ${
        props.maxSizeInMB
      } MB y no se agregarán a la lista`,
      confirmButton: 'Entiendo',
      title: '¡Atención!'
    });
  };

  const showInfoOverLimit = async () => {
    await DialogoService.notificacion({
      icon: 'info',
      text: `La cantidad de archivos (seleccionados + actuales) supera el límite permitido de ${props.limit} elementos. No se agregarán a la lista`,
      confirmButton: 'Entiendo',
      title: '¡Atención!'
    });
  };

  useEffect(() => {
    setValue(
      name,
      myFiles.filter((f) => f.fileUrl),
      {
        shouldDirty: true
      }
    );
    clearErrors(name);
  }, [myFiles]);

  function removeFile(f) {
    const newFiles = myFiles.filter((x) => x !== f);
    setfiles(newFiles);
    setValue(name, newFiles);
  }

  const upload = async (file, service) => {
    let newFile;

    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef
      .put(file)
      .then((res: any) => {
        newFile = { status: 'loaded', name: file.name };
      })
      .catch((e: any) => {
        newFile = { ...file, status: 'error' };
        console.log(e);
      });
    newFile = { ...newFile, fileUrl: await fileRef.getDownloadURL() };
    return newFile;
  };

  const confirmRemoveFile = async (item) => {
    const ok = await DialogoService.confirmacion({
      icon: 'warning',
      text: 'La eliminación de un documento no se puede deshacer. ¿Desea continuar?',
      confirmButton: 'Sí, eliminar documento',
      title: '¡Atención!'
    });
    if (ok) {
      removeFile(item);
    }
  };

  return (
    <>
      <Form.Group className="d-flex flex-row">
        <div className="mw-25">
          <FormControl
            type="file"
            className="form-control-file"
            id="fileControl"
            multiple
            accept={props.extensions?.map((x) => `.${x},`)}
            style={{ display: 'none' }}
            onChange={onChange}
            isInvalid={error}
            disabled={
              !props.enabled ||
              status === 'loading' ||
              (props.limit && myFiles.length === props.limit)
            }
          />
          <LabelFiles {...props} soloDescarga={soloDescarga} myFiles={myFiles} label={label} />
          <FormControl.Feedback type="invalid"> {error ? error.message : ''}</FormControl.Feedback>
        </div>
        <div>{props.extra && props.extra(myFiles, methods)}</div>
      </Form.Group>

      <MyFiles
        myFiles={myFiles}
        enabled={props.enabled}
        service={props.service}
        soloDescarga={soloDescarga}
        confirmRemoveFile={confirmRemoveFile}
      />
    </>
  );
}

export default FileManager;
