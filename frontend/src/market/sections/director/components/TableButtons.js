import {
  faFloppyDisk,
  faPenAlt,
  faRepeat,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SaveBtn = ({ saveHandler }) => {
  return (
    <button onClick={saveHandler} className='edit-btn px-4'>
      <FontAwesomeIcon className='text-sm' icon={faFloppyDisk} />
    </button>
  );
};

export const SaveBtnLoad = () => {
  return (
    <button className='edit-btn px-4' disabled>
      <span className='spinner-border spinner-border-sm'></span>
    </button>
  );
};

export const ClearBtn = ({ clearDatas }) => {
  return (
    <button onClick={clearDatas} className='delete-btn px-4'>
      <FontAwesomeIcon className='text-sm' icon={faRepeat} />
    </button>
  );
};

export const ClearBtnLoad = () => {
  return (
    <button className='delete-btn px-4' disabled>
      <span className='spinner-border spinner-border-sm'></span>
    </button>
  );
};

export const EditBtn = ({ editHandler }) => {
  return (
    <button onClick={editHandler} className='edit-btn px-4'>
      <FontAwesomeIcon className='text-sm' icon={faPenAlt} />
    </button>
  );
};

export const DeleteBtn = ({ deleteHandler }) => {
  return (
    <button onClick={deleteHandler} className='delete-btn px-4'>
      <FontAwesomeIcon className='text-sm' icon={faTrashCan} />
    </button>
  );
};

export const PrintBtnLoad = () => {
  return (
    <button className='print-btn px-4'disabled>
      <span className='spinner-border spinner-border-sm'></span>
    </button>
  );
};