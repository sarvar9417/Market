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
}) => {
  return (
    <div>
      <input
        value={data ? data : ''}
        onKeyUp={keyPressed}
        onChange={changeHandler}
        type={type}
        className={`input ${classes}`}
        name={name}
        placeholder={t(placeholder)}
      />
    </div>
  );
};
