import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

interface Props {
  isDisabled?: boolean;
  handleClick: any;
  tooltipMessage?: string;
  Component: any;
}

const OptionButton = (props: Props) => {
  const { isDisabled, handleClick, tooltipMessage, Component } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Button
      id="addButton"
      className={`btn-icon ${isDisabled ? 'disabled' : ''}`}
      color="success"
      disabled={isDisabled}
      onClick={() => handleClick()}
    >
      <Component size={16} />
      {tooltipMessage && (
        <Tooltip placement="top" isOpen={tooltipOpen} target="addButton" toggle={toggle}>
          {tooltipMessage}
        </Tooltip>
      )}
    </Button>
  );
};

OptionButton.defaultProps = {
  isDisabled: false
};

export default OptionButton;
