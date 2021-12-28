import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Row, Collapse, Button } from 'react-bootstrap';

interface Props {
  display: boolean;
  readOnly?: boolean;
  initialState?: boolean;
  children: any;
}

const CollapseForm = (props: Props) => {
  const { display, readOnly, initialState, children } = props;
  const [openWorkDir, setOpenWorkDir] = useState(initialState);

  const CleanColap = (e: any) => {
    e.preventDefault();
    setOpenWorkDir(!openWorkDir);
  };

  return (
    <>
      {display && (
        <>
          <hr />
          {!readOnly && (
            <Row className="justify-content-center pad-row toggleRow mb-6">
              <Button
                className="openAdvanced"
                variant="link"
                onClick={CleanColap}
                aria-controls="advanceS"
              >
                {openWorkDir
                  ? 'Ocultar datos tarjeta de circulación'
                  : 'Datos tarjeta de circulación'}
                <i>
                  {openWorkDir ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </i>
              </Button>
            </Row>
          )}
          <Collapse in={openWorkDir} className="mb-6">
            <div>{children}</div>
          </Collapse>
        </>
      )}
    </>
  );
};

export default CollapseForm;
