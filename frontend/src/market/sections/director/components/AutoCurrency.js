import React from 'react';
import ToggleButton from 'react-toggle-button';

const borderRadiusStyle = { borderRadius: 2 };

export const AutoCurrency = ({ onToggle, value }) => {
  return (
    <div className='inline-block'>
      <ToggleButton
        thumbStyle={borderRadiusStyle}
        trackStyle={borderRadiusStyle}
        inactiveLabel={'OFF'}
        activeLabel={'ON'}
        value={value}
        onToggle={onToggle}
      />
    </div>
  );
};
