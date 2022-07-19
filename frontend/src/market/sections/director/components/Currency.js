import React from 'react';
import ToggleButton from 'react-toggle-button';

const borderRadiusStyle = { borderRadius: 2 };

export const Currency = ({ onToggle, value }) => {
  return (
    <div className='inline-block'>
      <ToggleButton
        thumbStyle={borderRadiusStyle}
        trackStyle={borderRadiusStyle}
        inactiveLabel={'USD'}
        activeLabel={'UZS'}
        value={value}
        onToggle={onToggle}
      />
    </div>
  );
};
