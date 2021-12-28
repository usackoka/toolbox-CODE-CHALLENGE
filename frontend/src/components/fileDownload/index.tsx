import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

interface Props {
  fileUrl: string;
  metaData: any;
  inline?: boolean;
  element?: any;
  service?: string;
}

export const DownloadFile = (props: Props) => {
  const { fileUrl, metaData } = props;

  const downloadAndMakeElement = async (e: any): Promise<any> => {
    e.preventDefault();

    window.open(fileUrl);
    /*
    axios
      .get('', {
        baseURL:
          'https://firebasestorage.googleapis.com/v0/b/soat-590de.appspot.com/o/ayudagt.png?alt=media&token=600e466e-759a-4dc6-ba70-652f9e0cdda2',
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then((response) => {
        const buff = Buffer.from(response.data, 'binary');
        const blob = new Blob([buff], { type: 'octet/stream' });
        saveAs(blob, metaData?.nombre);
      })
      .catch((err) => {
        console.log(err);
      });
      */
  };

  if (props.element) return React.cloneElement(props.element, { onClick: downloadAndMakeElement });

  return (
    <>
      {fileUrl && (
        <div className={`${props.inline ? 'd-inline-flex' : 'd-column-flex'}`}>
          <a
            href="/#"
            onClick={(e: any) => {
              downloadAndMakeElement(e);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faFile} className={`mr-2`} />
              {metaData?.nombre}
            </span>
          </a>
        </div>
      )}
    </>
  );
};
