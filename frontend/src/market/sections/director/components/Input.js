import { t } from 'i18next';
import React from 'react';

export const Input = ({
  classes,
  data,
  keyPressed,
  changeHandler,
  type,
  placeholder,
  name,
  loading,
}) => {
  return (
    <div>
      <input
        datatype='input'
        value={data ? data : ''}
        onKeyUp={keyPressed}
        disabled={loading}
        onChange={changeHandler}
        type={type}
        className={`input ${classes}`}
        name={name}
        placeholder={t(placeholder)}
      />
    </div>
  );
};

export const SearchInput = ({
  className,
  keyPressed,
  changeHandler,
  type,
  placeholder,
  name,
  value,
  loading,
}) => {
  return (
    <div>
      <input
        datatype='input'
        onKeyUp={keyPressed}
        onChange={changeHandler}
        disabled={loading}
        type={type}
        className={`input ${className}`}
        name={name}
        placeholder={t(placeholder)}
        value={value}
      />
    </div>
  );
};
