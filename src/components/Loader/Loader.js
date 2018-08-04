import React from 'react';

import loader from '../../assets/loader.svg';

import './Loader.scss';

export const Loader = () => (
  <div className="Loader">
    <img src={loader} />
  </div>
);
