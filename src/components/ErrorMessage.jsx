import React from 'react';

function ErrorMessage(props) {
  return (
    <div className={props.type === "auth" ? "error-auth" : "error-reg"}>
      {props.message}
    </div>
  );
}

export default ErrorMessage;