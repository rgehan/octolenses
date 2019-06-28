import React from 'react';

interface IProps {
  conflicting: boolean;
}

export const ConflictIndicator = ({ conflicting }: IProps) => {
  if (!conflicting) {
    return null;
  }

  return (
    <i
      className="fas fa-exclamation-triangle text-red-500 text-sm ml-2"
      title="There are conflicts on this PR"
    />
  );
};
