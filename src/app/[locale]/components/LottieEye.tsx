"use client";

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationDataDark from '../../lotties/eye.json';
import animationDataLight from '../../lotties/eyeWhite.json';
import { useTheme } from 'next-themes';

interface LottieEyeProps {
  height?: number;
  width?: number;
}

const LottieEye: React.FC<LottieEyeProps> = ({ height, width }) => {
  const { resolvedTheme } = useTheme();
  const [animationData, setAnimationData] = useState(animationDataLight);

  useEffect(() => {
    setAnimationData(resolvedTheme === 'dark' ? animationDataDark : animationDataLight);
  }, [resolvedTheme]);

  const aspectRatio = 2; // Proporção de largura para altura

  const calculatedHeight = height || (width ? width / aspectRatio : undefined);
  const calculatedWidth = width || (height ? height * aspectRatio : undefined);

  return (
    <div style={{ height: calculatedHeight, width: calculatedWidth }}>
      <Lottie animationData={animationData} style={{ height: '100%', width: '100%' }} loop={true} />
    </div>
  );
};

export default LottieEye;
