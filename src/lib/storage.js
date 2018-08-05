import React from 'react';
import { mapValues } from 'lodash';

export const storeData = (key, value) => {
  localStorage.setItem(key, value);
};

export const withStorage = dataToRetrieve => WrappedComponent => {
  const propsFromStorage = mapValues(dataToRetrieve, key =>
    localStorage.getItem(key)
  );

  console.log(propsFromStorage);

  return props => (
    <WrappedComponent storeData={storeData} {...props} {...propsFromStorage} />
  );
};
