"use client"; 

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../lotties/eye.json';

interface LottieEyeProps {
  height?: number;
  width?: number;
}

const LottieEye: React.FC<LottieEyeProps> = ({ height, width }) => {
  return (
    <div style={{ height, width }}>
      <Lottie animationData={animationData} style={{ height: '100%', width: '100%' }} loop={true} />
    </div>
  );
};

export default LottieEye;
