import React from 'react';

type SpacerProps = {
  sizeIF: number | string;
};

export const Spacer: React.FC<SpacerProps> = ({ sizeIF }) => {
  return <div style={{ width: 'auto', height: sizeIF, flexShrink: 0 }} />;
};
