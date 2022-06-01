import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export const Sort = ({ property, data, setData }) => {
  return (
    <div className='flex flex-col pl-2'>
      <FontAwesomeIcon
        onClick={() =>
          setData(
            [...data].sort((a, b) => (a[property] > b[property] ? 1 : -1))
          )
        }
        icon={faAngleUp}
        className='cursor-pointer p-0 m-0'
      />
      <FontAwesomeIcon
        icon={faAngleDown}
        className='cursor-pointer p-0 m-0'
        onClick={() =>
          setData(
            [...data].sort((a, b) => (b[property] > a[property] ? 1 : -1))
          )
        }
      />
    </div>
  );
};
