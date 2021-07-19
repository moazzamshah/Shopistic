import React from 'react';

function MessageBox(props) {
  return (
    <div className='container my-5'>
      <div className={`alert alert-${props.variant}  ||  "info" `}>
        {props.children}
      </div>
    </div>
  );
}

export default MessageBox;
