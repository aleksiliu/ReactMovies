import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="wrapper">
      <p className="center">
        Error :( Get back to <Link to={'/'}>homepage</Link>
      </p>
    </div>
  );
};

export default Error;
