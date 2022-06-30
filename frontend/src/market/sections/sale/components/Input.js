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
        value={data ? data : ''}
        onKeyUp={keyPressed}
        onChange={changeHandler}
        type={type}
        disabled={loading}
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
        onKeyUp={keyPressed}
        onChange={changeHandler}
        type={type}
        disabled={loading}
        className={`input ${className}`}
        name={name}
        placeholder={t(placeholder)}
        value={value}
      />
    </div>
  );
};
