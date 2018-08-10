import React from 'react';

import './Loader.scss';

export const Loader = ({ size = 50, color = '#678bc2', strokeWidth = 10 }) => (
  <div className="Loader">
    <svg
      width={`${size}px`}
      height={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-rolling"
      style={{ background: 'none' }}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(41.8255 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);
