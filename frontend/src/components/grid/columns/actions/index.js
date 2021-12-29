import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HideColumn = ({
  children,
  condition,
  data
}) => {
  if (condition !== undefined && condition(data)) {
    return <></>;
  }
  return children;
};

function ActionsColumn(props) {
  const { prefix, actions, rowIndex, data } = props;
  const mapAction = (array, row) => {
    return array.map((item, index) => {
      const { icon, display } = item;
      return display === undefined || display(row) ? (
        <HideColumn condition={item?.hidden} data={data}>
          {
            <button
              key={`${prefix ?? ''}${rowIndex}-action-${index}`}
              className={`btn btn-sm m-1  ${item.style}`}
              type="button"
              onClick={() => item.click(row)}
            >
              <FontAwesomeIcon
                key={`${prefix ?? ''}${rowIndex}-icon-${index}`}
                icon={icon}
                className={item.label ? 'mr-1' : ''}
              />
              {item.label ?? ''}
            </button>
          }
        </HideColumn>
      ) : (
        <></>
      );
    });
  };

  return (
    <div className="d-flex flex-lg-row-reverse flex-md-row-reverse flex-xl-row-reverse flex-sm-row w-100">
      {mapAction(actions, data)}
    </div>
  );
}

export default ActionsColumn;
