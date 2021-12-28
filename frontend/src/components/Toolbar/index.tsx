import React, { Fragment } from 'react';
import { ButtonToolbar } from 'reactstrap';

interface Props {
  buttons: any[];
  className: string;
}

const Toolbar = (props: Props) => {
  const { buttons, className } = props;
  return (
    <ButtonToolbar className={`${className} justify-content-end`}>
      {buttons.map((child, index) => (
        <Fragment key={index}>{child}</Fragment>
      ))}
    </ButtonToolbar>
  );
};

export default Toolbar;
