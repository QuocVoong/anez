import React, { memo } from 'react';

const Button = (props) => {
  return <button {...props}/>
}

export default memo(Button);